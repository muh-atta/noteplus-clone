import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  if (!title || title.length > 200)
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });

  const task = await prisma.task.create({
    data: {
      title,
      userId: session.user.id,
    },
  });

  return NextResponse.json(task);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    100
  );
  const q = url.searchParams.get("q") || "";

  const where = {
    userId: session.user.id,
    title: { contains: q, mode: Prisma.QueryMode.insensitive },
  };

  const total = await prisma.task.count({ where });

  const tasks = await prisma.task.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    {
      items: tasks,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== session.user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title } = await req.json();
  console.log("Updating task:", id, title);
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== session.user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.task.update({
    where: { id },
    data: {
      title: title !== undefined ? title : task.title,
    },
  });

  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "Task ID required" }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== session.user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.task.update({
    where: { id },
    data: { done: !task.done },
  });

  return NextResponse.json(updated);
}

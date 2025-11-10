import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { title, userId } = await req.json();
  if (!userId)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });

  if (!title || title.length > 200)
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });

  const task = await prisma.task.create({
    data: {
      title,
      userId
    },
  });

  return NextResponse.json(task);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100);
  const q = url.searchParams.get("q") || "";

  if (!userId)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });

  const where = {
    userId,
    title: { contains: q, mode: Prisma.QueryMode.insensitive },
  };

  const [total, tasks] = await prisma.$transaction([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    })
  ]);

  return NextResponse.json({
    items: tasks,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
}


export async function DELETE(req: NextRequest) {
  const { id, userId } = await req.json();
  if (!id || !userId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { id, title, userId } = await req.json();
  if (!id || !userId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.task.update({
    where: { id },
    data: { title },
  });

  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
  const { id, userId } = await req.json();

  if (!id || !userId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.task.update({
    where: { id },
    data: { done: !task.done },
  });

  return NextResponse.json(updated);
}

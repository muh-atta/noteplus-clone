import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { title, description, userId, plan } = await req.json();
  if (!userId)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  const category = plan;
  if (!title || title.length > 200)
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
      category,
    },
  });

  return NextResponse.json(task);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    100
  );
  const q = url.searchParams.get("q") || "";
  const filter = url.searchParams.get("filter");
  console.log("called", filter);
  if (!userId)
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });

  let where: any = {
    userId,
    title: { contains: q, mode: Prisma.QueryMode.insensitive },
  };

  if (filter === "done") {
    where.AND = [{ done: true }, { status: false }];
  } else if (filter === "status") {
    where.status = true;
  } else if (filter === "all") {
    where.AND = [{ done: false }, { status: false }];
  } else if (filter === "project") {
    where.AND = [{ done: false }, { status: false }, { category: "high" }];
  } else if (filter === "plans") {
    where.AND = [{ done: false }, { status: false }, { category: "normal" }];
  } else if (filter === "routine") {
    where.AND = [{ done: false }, { status: false }, { category: "low" }];
  } else {
    return;
  }

  const [total, tasks] = await prisma.$transaction([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
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
  const updated = await prisma.task.update({
    where: { id },
    data: { status: true },
  });

  return NextResponse.json(updated);
}

export async function PUT(req: NextRequest) {
  const { id, title, description, userId } = await req.json();
  if (!id || !userId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.task.update({
    where: { id },
    data: { title, description },
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

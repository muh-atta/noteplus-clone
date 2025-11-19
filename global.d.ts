declare module "@auth/prisma-adapter" {
  import type { Adapter } from "next-auth/adapters";
  const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

  export function PrismaAdapter(prisma): Adapter;
}

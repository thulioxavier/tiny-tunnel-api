import { Prisma, PrismaClient } from "@prisma/client";

export const dbClient = new PrismaClient().$extends({
    model: {
      $allModels: {
        async delete<M, A>(
          this: M,
          where: Prisma.Args<M, 'delete'>,
        ): Promise<Prisma.Result<M, A, 'update'>> {
          const context = Prisma.getExtensionContext(this)
  
          return (context as any).update({
            ...where,
            data: {
              deletedAt: new Date(),
            },
          })
        },
      },
    },
  });

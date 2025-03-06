"use server";

import { prisma } from "@repo/database";

type DeleteUserProps = {
  id: number;
};

export const deleteUser = async ({ id }: DeleteUserProps) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.userAddress.deleteMany({
        where: {
          userId: id,
        },
      });

      await tx.user.delete({
        where: { id },
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
};

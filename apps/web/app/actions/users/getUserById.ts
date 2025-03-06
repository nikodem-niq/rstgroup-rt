"use server";

import { prisma } from "@repo/database";

type GetUserByIdProps = {
  id: number;
};

export const getUserById = async ({ id }: GetUserByIdProps) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

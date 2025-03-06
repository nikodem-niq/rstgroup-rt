"use server";

import { prisma } from "@repo/database";
import { z } from "zod";
import {
  userSchema,
  type UserFormValues,
} from "../../shared/lib/validation/user";

type UpdateUserProps = {
  id: number;
  data: UserFormValues;
};

export const updateUser = async ({ id, data }: UpdateUserProps) => {
  try {
    const validatedData = userSchema.parse(data);

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...validatedData,
        status: validatedData.status,
      },
    });

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.format() };
    }
    return { success: false, error: "Failed to update user" };
  }
};

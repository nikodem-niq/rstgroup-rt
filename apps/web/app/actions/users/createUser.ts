"use server";

import { prisma } from "@repo/database";
import { z } from "zod";
import {
  userSchema,
  type UserFormValues,
} from "../../shared/lib/validation/user";

type CreateUserProps = {
  data: UserFormValues;
};

export const createUser = async ({ data }: CreateUserProps) => {
  try {
    const validatedData = userSchema.parse(data);

    const user = await prisma.user.create({
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

    return { success: false, error: "Failed to create user" };
  }
};

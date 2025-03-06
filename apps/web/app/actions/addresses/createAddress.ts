"use server";

import { prisma } from "@repo/database";
import { z } from "zod";
import {
  addressSchema,
  type AddressFormValuesWithoutUserId,
} from "../../shared/lib/validation/address";

type CreateAddressProps = {
  userId: number;
  data: AddressFormValuesWithoutUserId;
};

export const createAddress = async ({ userId, data }: CreateAddressProps) => {
  try {
    const fullData = { ...data, userId };
    const validatedData = addressSchema.parse(fullData);

    const address = await prisma.userAddress.create({
      data: validatedData,
    });

    return { success: true, address };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.format() };
    }

    return { success: false, error: "Failed to create address" };
  }
};

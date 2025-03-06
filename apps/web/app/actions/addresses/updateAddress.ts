"use server";

import { prisma, AddressType } from "@repo/database";
import { z } from "zod";
import {
  addressSchema,
  type AddressFormValuesWithoutUserId,
} from "../../shared/lib/validation/address";

type UpdateAddressProps = {
  userId: number;
  addressType: AddressType;
  validFrom: Date;
  data: AddressFormValuesWithoutUserId;
};

export const updateAddress = async ({
  userId,
  addressType,
  validFrom,
  data,
}: UpdateAddressProps) => {
  try {
    const fullData = { ...data, userId };
    const validatedData = addressSchema.parse(fullData);

    const address = await prisma.userAddress.update({
      where: {
        userId_addressType_validFrom: {
          userId,
          addressType,
          validFrom,
        },
      },
      data: validatedData,
    });

    return { success: true, address };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.format() };
    }

    return { success: false, error: "Failed to update address" };
  }
};

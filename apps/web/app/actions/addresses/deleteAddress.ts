"use server";

import { prisma, AddressType } from "@repo/database";

type DeleteAddressProps = {
  userId: number;
  addressType: AddressType;
  validFrom: Date;
};

export const deleteAddress = async ({
  userId,
  addressType,
  validFrom,
}: DeleteAddressProps) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId_addressType_validFrom: {
          userId,
          addressType,
          validFrom,
        },
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete address" };
  }
};

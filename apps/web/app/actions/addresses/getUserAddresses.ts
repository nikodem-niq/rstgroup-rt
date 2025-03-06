"use server";

import { prisma } from "@repo/database";

type GetUserAddressesProps = {
  userId: number;
  page?: number;
  pageSize?: number;
};

export const getUserAddresses = async ({
  userId,
  page = 1,
  pageSize = 10,
}: GetUserAddressesProps) => {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [addresses, totalCount] = await Promise.all([
      prisma.userAddress.findMany({
        where: { userId },
        skip,
        take,
        orderBy: [{ addressType: "asc" }, { validFrom: "desc" }],
      }),

      prisma.userAddress.count({
        where: { userId },
      }),
    ]);

    return {
      addresses,
      meta: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch addresses");
  }
};

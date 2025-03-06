"use server";

import { prisma } from "@repo/database";

type GetUsersProps = {
  page?: number;
  pageSize?: number;
};

export const getUsers = async ({ page = 1, pageSize = 10 }: GetUsersProps) => {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { lastName: "asc" },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      meta: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

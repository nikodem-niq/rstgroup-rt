import { z } from "zod";
import { UserStatus } from "@repo/database";

export const userSchema = z.object({
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(100).min(1, { message: "Last name is required" }),
  initials: z.string().max(30).optional(),
  email: z.string().email().max(100),
  status: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
});

export const userDefaultValues: UserFormValues = {
  firstName: "",
  lastName: "",
  initials: "",
  email: "",
  status: UserStatus.ACTIVE,
};

export type UserFormValues = z.infer<typeof userSchema>;

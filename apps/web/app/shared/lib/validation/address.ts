import { z } from "zod";
import { AddressType } from "@repo/database";

export const addressSchema = z.object({
  userId: z.number().int().positive(),
  addressType: z.nativeEnum(AddressType),
  validFrom: z.coerce.date(),
  postCode: z.string().min(1).max(6),
  city: z.string().min(1).max(60),
  countryCode: z.string().length(3),
  street: z.string().min(1).max(100),
  buildingNumber: z.string().min(1).max(60),
});

export const defaultAddressValues = {
  userId: 0,
  addressType: AddressType.HOME,
  validFrom: new Date(),
  postCode: "",
  city: "",
  countryCode: "",
  street: "",
  buildingNumber: "",
};

export type AddressFormValues = z.infer<typeof addressSchema>;
export type AddressFormValuesWithoutUserId = Omit<AddressFormValues, "userId">;

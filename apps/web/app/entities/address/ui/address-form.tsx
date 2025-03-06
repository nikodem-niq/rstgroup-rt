"use client";

import { UserAddress } from "@repo/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  AddressFormValuesWithoutUserId,
  addressSchema,
  defaultAddressValues,
  type AddressFormValues,
} from "../../../shared/lib/validation/address";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";

type AddressFormProps = {
  address?: UserAddress;
  userId: number;
  onSubmit: (data: AddressFormValuesWithoutUserId) => void;
  isSubmitting?: boolean;
};

export const AddressForm = ({
  address,
  userId,
  onSubmit,
  isSubmitting = false,
}: AddressFormProps) => {
  const defaultValues = address ? address : { ...defaultAddressValues, userId };

  const [addressPreview, setAddressPreview] = useState({
    street: defaultValues.street,
    buildingNumber: defaultValues.buildingNumber,
    postCode: defaultValues.postCode,
    city: defaultValues.city,
    countryCode: defaultValues.countryCode,
  });

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setAddressPreview({
        street: value.street || "",
        buildingNumber: value.buildingNumber || "",
        postCode: value.postCode || "",
        city: value.city || "",
        countryCode: value.countryCode || "",
      });
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (data: AddressFormValues) => {
    const { userId: _, ...dataWithoutUserId } = data;
    onSubmit(dataWithoutUserId);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOME">Home</SelectItem>
                    <SelectItem value="INVOICE">Invoice</SelectItem>
                    <SelectItem value="POST">Post</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Main Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buildingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Number</FormLabel>
                <FormControl>
                  <Input placeholder="10A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Sample City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code (ISO3166-1 alpha-3)</FormLabel>
                <FormControl>
                  <Input placeholder="USA" {...field} maxLength={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid From</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? "Saving..."
              : address
                ? "Update Address"
                : "Create Address"}
          </Button>
        </form>
      </Form>

      <div>
        <h3 className="text-sm font-medium mb-2">Address Preview</h3>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm space-y-1">
              {(addressPreview.street || addressPreview.buildingNumber) && (
                <p>
                  {addressPreview.street} {addressPreview.buildingNumber}
                </p>
              )}
              {(addressPreview.postCode || addressPreview.city) && (
                <p>
                  {addressPreview.postCode} {addressPreview.city}
                </p>
              )}
              {addressPreview.countryCode && (
                <p>{addressPreview.countryCode}</p>
              )}
              {!addressPreview.street &&
                !addressPreview.buildingNumber &&
                !addressPreview.postCode &&
                !addressPreview.city &&
                !addressPreview.countryCode && (
                  <p className="text-muted-foreground">
                    Fill in the form to see the address preview
                  </p>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

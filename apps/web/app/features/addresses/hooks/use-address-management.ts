"use client";

import { User, UserAddress } from "@repo/database";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AddressFormValuesWithoutUserId } from "../../../shared/lib/validation/address";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../../actions/addresses";
import { useToast } from "@repo/ui/hooks/use-toast";

export const useAddressManagement = (user: User) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );

  const handleCreateAddress = async (data: AddressFormValuesWithoutUserId) => {
    startTransition(async () => {
      try {
        const result = await createAddress({
          userId: user.id,
          data,
        });
        if (result.success) {
          setIsCreateModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "Address created successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to create address",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleEditAddress = async (data: AddressFormValuesWithoutUserId) => {
    if (!selectedAddress) return;

    startTransition(async () => {
      try {
        const result = await updateAddress({
          userId: selectedAddress.userId,
          addressType: selectedAddress.addressType,
          validFrom: selectedAddress.validFrom,
          data,
        });
        if (result.success) {
          setIsEditModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "Address updated successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to update address",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;

    startTransition(async () => {
      try {
        const result = await deleteAddress({
          userId: selectedAddress.userId,
          addressType: selectedAddress.addressType,
          validFrom: selectedAddress.validFrom,
        });
        if (result.success) {
          setIsDeleteModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "Address deleted successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to delete address",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return {
    isPending,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedAddress,
    setSelectedAddress,
    handleCreateAddress,
    handleEditAddress,
    handleDeleteAddress,
  };
};

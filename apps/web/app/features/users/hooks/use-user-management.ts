"use client";

import { User } from "@repo/database";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../shared/lib/validation/user";
import { createUser, deleteUser, updateUser } from "../../../actions/users";
import { useToast } from "@repo/ui/hooks/use-toast";

export const useUserManagement = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = async (data: UserFormValues) => {
    startTransition(async () => {
      try {
        const result = await createUser({ data });
        if (result.success) {
          setIsCreateModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "User created successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to create user",
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

  const handleEditUser = async (data: UserFormValues) => {
    if (!selectedUser) return;

    startTransition(async () => {
      try {
        const result = await updateUser({
          id: selectedUser.id,
          data,
        });
        if (result.success) {
          setIsEditModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "User updated successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to update user",
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

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    startTransition(async () => {
      try {
        const result = await deleteUser({ id: selectedUser.id });
        if (result.success) {
          setIsDeleteModalOpen(false);
          router.refresh();
          toast({
            title: "Success",
            description: "User deleted successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description:
              typeof result.error === "string"
                ? result.error
                : "Failed to delete user",
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
    selectedUser,
    setSelectedUser,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
  };
};

"use client";

import { User } from "@repo/database";
import { Button } from "@repo/ui/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Modal } from "../../../shared/ui/modal";
import { UserForm } from "../../../entities/user/ui/user-form";
import { UserCard } from "../../../entities/user/ui/user-card";
import { useUserManagement } from "../hooks/use-user-management";

type UserListProps = {
  users: User[];
};

export const UserList = ({ users }: UserListProps) => {
  const {
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
  } = useUserManagement();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Users</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}
            onDelete={(user) => {
              setSelectedUser(user);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
        {users.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No users found. Create one to get started.
          </div>
        )}
      </div>

      <Modal
        title="Create User"
        description="Add a new user to the system"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <UserForm onSubmit={handleCreateUser} isSubmitting={isPending} />
      </Modal>

      <Modal
        title="Edit User"
        description="Update user information"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSubmit={handleEditUser}
            isSubmitting={isPending}
          />
        )}
      </Modal>

      <Modal
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteUser}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

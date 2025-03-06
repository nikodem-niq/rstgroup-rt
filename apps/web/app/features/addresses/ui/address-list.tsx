"use client";

import { User, UserAddress } from "@repo/database";
import { AddressCard } from "../../../entities/address/ui/address-card";
import { Button } from "@repo/ui/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Modal } from "../../../shared/ui/modal";
import { AddressForm } from "../../../entities/address/ui/address-form";
import { useAddressManagement } from "../hooks/use-address-management";

type AddressListProps = {
  addresses: UserAddress[];
  user: User;
};

export const AddressList = ({ addresses, user }: AddressListProps) => {
  const {
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
  } = useAddressManagement(user);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Addresses</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={`${address.userId}-${address.addressType}-${address.validFrom.toString()}`}
            address={address}
            onEdit={(address) => {
              setSelectedAddress(address);
              setIsEditModalOpen(true);
            }}
            onDelete={(address) => {
              setSelectedAddress(address);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
        {addresses.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No addresses found. Create one to get started.
          </div>
        )}
      </div>

      <Modal
        title="Create Address"
        description="Add a new address"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <AddressForm
          userId={user.id}
          onSubmit={handleCreateAddress}
          isSubmitting={isPending}
        />
      </Modal>

      <Modal
        title="Edit Address"
        description="Update address information"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedAddress && (
          <AddressForm
            address={selectedAddress}
            userId={user.id}
            onSubmit={handleEditAddress}
            isSubmitting={isPending}
          />
        )}
      </Modal>

      <Modal
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
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
            onClick={handleDeleteAddress}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

"use client";

import { UserAddress } from "@repo/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Button } from "@repo/ui/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

type AddressCardProps = {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
};

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{address.addressType}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Valid from: {format(new Date(address.validFrom), "PPP")}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(address)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(address)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-1">
          <p>
            {address.street} {address.buildingNumber}
          </p>
          <p>
            {address.postCode} {address.city}
          </p>
          <p>{address.countryCode}</p>
        </div>
      </CardContent>
    </Card>
  );
};

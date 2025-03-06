"use client";

import { User, UserStatus } from "@repo/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Button } from "@repo/ui/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Link href={`/users/${user.id}/addresses`} passHref>
      <Card className="cursor-pointer hover:bg-muted/50 transition-colors h-full">
        <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(user);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(user);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <Badge
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                user.status === UserStatus.ACTIVE
                  ? "bg-green-50 text-green-700 ring-green-600/20"
                  : "bg-red-50 text-red-700 ring-red-600/20"
              }`}
            >
              {user.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

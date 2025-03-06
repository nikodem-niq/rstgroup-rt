import { getUserById } from "../../../../actions/users";
import { getUserAddresses } from "../../../../actions/addresses";
import { AddressList } from "../../../../features/addresses/ui/address-list";
import { Pagination } from "../../../../shared/ui/pagination";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function UserAddressesPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page?: string };
}) {
  const userId = Number(params.id);
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  const user = await getUserById({ id: userId }).catch(() => null);

  if (!user) {
    notFound();
  }

  const { addresses, meta } = await getUserAddresses({
    userId,
    page,
    pageSize,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/users" passHref>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          Addresses for {user.firstName} {user.lastName}
        </h1>
      </div>

      <Suspense fallback={<div>Loading addresses...</div>}>
        <AddressList addresses={addresses} user={user} />

        <div className="mt-6">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            baseUrl={`/users/${userId}/addresses`}
          />
        </div>
      </Suspense>
    </div>
  );
}

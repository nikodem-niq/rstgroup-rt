import { getUsers } from "../../actions/users";
import { UserList } from "../../features/users/ui/user-list";
import { Pagination } from "../../shared/ui/pagination";
import { Suspense } from "react";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  const { users, meta } = await getUsers({ page, pageSize });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <Suspense fallback={<div>Loading users...</div>}>
        <UserList users={users} />

        <div className="mt-6">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            baseUrl="/users"
          />
        </div>
      </Suspense>
    </div>
  );
}

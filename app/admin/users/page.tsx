import { handleGetAllUser } from "@/lib/actions/admin/user_action";
import UserTable from "../_components/user.table";

// export default async function Page() {
//   const response = await handleGetAllUser();

//   if (!response.success) {
//     throw new Error(response.message || "Failed to load user data");
//   }

//   if (!response.data) {
//     throw new Error("No User found");
//   }

//   return (
//     <div>
//       <UserTable data={response.data}></UserTable>
//     </div>
//   );
// }

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; size?: string };
}) {
  const param = await searchParams;
  const page = param.page ? parseInt(param.page as string, 10) : 1;
  const size = param.size ? parseInt(param.size as string, 10) : 10;

  const response = await handleGetAllUser(page, size);

  if (!response.success) {
    throw new Error(response.message || "Failed to load user data");
  }

  if (!response.data) {
    throw new Error("No User found");
  }
  return (
    <div>
      <UserTable
        data={response.data}
        pagination={response.pagination}
      ></UserTable>
    </div>
  );
}

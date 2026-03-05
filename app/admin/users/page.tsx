import { handleGetAllUser } from "@/lib/actions/admin/user_action";
import UserTable from "../_components/user.table";
import { redirect } from "next/navigation";


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
    const message = (response.message || "").toLowerCase();
    const isUnauthorizedError =
      message.includes("unauthor") ||
      message.includes("unathur") ||
      message.includes("jwt") ||
      message.includes("token");

    if (isUnauthorizedError) {
      redirect("/login");
    }

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

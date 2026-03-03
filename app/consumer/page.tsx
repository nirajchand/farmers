import { handleGetAllProducts } from "@/lib/actions/consumer/products";
import DashboardPage from "./_components/dashboard";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; size?: string; search?: string };
}) {
  const param = await searchParams;
  const page = param.page ? parseInt(param.page) : 1;
  const size = param.size ? parseInt(param.size) : 10;
  const search = param.search || "";

  const response = await handleGetAllProducts(page, size,search);

  return (
    <div>
      <DashboardPage
      products={response.data}
      pagination={response.pagination}
      ></DashboardPage>
    </div>
  );
}

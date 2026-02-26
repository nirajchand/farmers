import { id } from "zod/locales";
import UpdateProductPage from "../../_components/updateProduct";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div>
      <UpdateProductPage productId={id}/>
    </div>
  );
}
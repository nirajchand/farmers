import EditConsumer from "@/app/admin/_components/edit.consumer";
import EditFarmer from "@/app/admin/_components/edit.farmer";


export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role: string }>;
}) {
  const { id } = await params;
  const { role } = await searchParams;
  return (
    <div>
      {role === "consumer" && (
        <EditConsumer userId={id}></EditConsumer>
      )}
      {role === "farmer" && <EditFarmer userId={id}></EditFarmer>}
    </div>
  );
}

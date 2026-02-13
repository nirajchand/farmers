import EditConsumer from "@/app/admin/_components/edit.consumer";
import EditFarmer from "@/app/admin/_components/edit.farmer";
import EditConsumerProfilePage from "@/app/consumer/_components/editPage";
import EditFarmerProfilePage from "@/app/farmer/_components/EditProfile";

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

import ShowConsumerDetails from "../../_components/show.consumer.details";
import ShowFarmerDetails from "../../_components/show.farmer.details";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { role?: string };
}) {
  const { id } = await params;
  const { role } = await searchParams;
  return (
    <div>
      {role === "consumer" && (
        <ShowConsumerDetails userId={id}></ShowConsumerDetails>
      )}
      {role === "farmer" &&(
        <ShowFarmerDetails userId={id} ></ShowFarmerDetails>
      )}
    </div>
  );
}

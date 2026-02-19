export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const {id: productId} = await params;
  return <div>
    i get id = {productId}
  </div>;
}

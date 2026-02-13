export default function FarmerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
      <div className="bg-green-50 rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="text-gray-500">Total Crops</div>
        <div className="text-2xl font-bold text-green-600">120</div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="text-gray-500">Pending Orders</div>
        <div className="text-2xl font-bold text-orange-500">15</div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="text-gray-500">Sold Items</div>
        <div className="text-2xl font-bold text-green-600">90</div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="text-gray-500">Revenue</div>
        <div className="text-2xl font-bold text-green-600">$1,250</div>
      </div>
    </div>
  );
}

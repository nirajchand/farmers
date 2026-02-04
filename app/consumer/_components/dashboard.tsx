import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Tomato",
    price: 80,
    image: "/vegetables/tomato.jpg",
    stock: "Available",
  },
  {
    id: 2,
    name: "Potato",
    price: 60,
    image: "/vegetables/potato.jpg",
    stock: "Available",
  },
  {
    id: 3,
    name: "Carrot",
    price: 100,
    image: "/vegetables/carrot.jpg",
    stock: "Low Stock",
  },
  {
    id: 4,
    name: "Cabbage",
    price: 70,
    image: "/vegetables/cabbage.jpg",
    stock: "Available",
  },
  {
    id: 5,
    name: "Cabbage",
    price: 70,
    image: "/vegetables/cabbage.jpg",
    stock: "Available",
  },
  {
    id: 6,
    name: "Cabbage",
    price: 70,
    image: "/vegetables/cabbage.jpg",
    stock: "Available",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-20">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-green-600">Vegetables</h1>
      {/* Product Grid */}
      <div className=" grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
          >
            {/* Image */}
            <div className="relative w-full h-40 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Details */}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Rs. {product.price} / kg</p>

            {/* Stock Badge */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                product.stock === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {product.stock}
            </span>

            {/* Button */}
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

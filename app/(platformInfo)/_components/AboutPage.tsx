"use client";

import { useRouter } from "next/navigation";
export default function AboutPage() {
    const router = useRouter();
  return (
    <div className="bg-[#F9FBE7] min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Connecting Farmers Directly to Your Table
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Fresh produce. Fair pricing. Sustainable agriculture.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We empower local farmers by giving them direct access to customers,
            ensuring better profits while delivering fresh and healthy food
            to communities.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Direct Farmer Connection",
              "No Middlemen",
              "Fresh & Organic Products",
              "Secure Payments",
              "Transparent Pricing",
              "Community Focused"
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <p className="font-semibold text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            "Farmers list products",
            "Customers browse & order",
            "Farmers prepare & dispatch",
            "Fresh delivery to your home"
          ].map((step, index) => (
            <div key={index} className="bg-green-100 p-6 rounded-2xl">
              <div className="text-2xl font-bold text-green-700 mb-4">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Start Your Farm-Fresh Journey Today
        </h2>
        <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        onClick={()=>{
            router.push("/login")
        }}>
          Explore Products
        </button>
      </section>
    </div>
  );
}
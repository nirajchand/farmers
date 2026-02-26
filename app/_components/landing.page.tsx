"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Truck, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
              <Leaf className="w-4 h-4" />
              <span>100% Organic & Fresh</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Fresh from
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                the farm
              </span>
              <br />
              <span className="text-gray-900">to your table</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover local farmers, seasonal ingredients, and chef-curated boxes delivered fresh to your door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/login"
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-green-600 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-green-600">500+</p>
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-green-600">50+</p>
                <p className="text-sm text-gray-600 mt-1">Local Farmers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600 mt-1">Organic</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
            
            {/* Main Image */}
            <div className="relative">
              <img
                src="/images/landingImage.png"
                alt="Fresh vegetables and farm produce"
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl object-cover z-10"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Certified</p>
                  <p className="text-sm text-gray-600">100% Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">Farmers</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you directly with local farmers to bring you the freshest, most sustainable produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh & Organic</h3>
              <p className="text-gray-600">
                All our produce is 100% organic, grown without harmful pesticides or chemicals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Farm-fresh produce delivered to your doorstep within 24 hours of harvest.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Support Local</h3>
              <p className="text-gray-600">
                Every purchase supports local farmers and sustainable farming practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
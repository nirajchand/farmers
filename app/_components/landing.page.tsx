export default function LandingPage() {
  return (
    <section className="bg-green-700 min-h-screen flex items-center justify-center px-6 py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Fresh from the farm,<br />
            <span className="text-green-200">Straight to your table</span>
          </h1>

          <p className="mt-6 md:mt-8 text-lg sm:text-xl text-green-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Discover local farmers, seasonal ingredients, and chef-curated boxes delivered fresh to your door.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition shadow-lg">
              Shop Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/landingImage.png"
            alt="Fresh vegetables and farm produce"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
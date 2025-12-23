import { Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="md:w-1/2">
          <img
            src="/images/vegetable.jpg"
            alt="Fresh Vegetables"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="flex justify-center mb-8">
              <img
                src="/images/logoName.png"
                alt="Logo"
                className="h-20 w-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-[#15A305] text-center mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-[#15A305] mb-8">
              Sign in to your account
            </p>

            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15A305]/30 transition"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15A305]/30 transition"
              />
            </div>

            <button className="w-full text-right text-[#15A305] font-medium hover:underline mb-6">
              Forgot Password?
            </button>

            <button className="w-full bg-[#15A305] text-white font-bold py-3 rounded-lg hover:bg-[#128d04] transition duration-200 shadow-md">
              Sign In to Your Account
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm font-semibold text-gray-500">
                OR
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-[#15A305] py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
              <img
                src="/images/google.webp"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            <div className="text-center mt-8">
              <button className="text-[#15A305] font-semibold hover:underline">
                Create new Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

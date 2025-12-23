export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="Farmers Logo"
              className="w-12 h-14 object-contain"
            />
            <span className="text-2xl font-bold">Farmers</span>
          </div>
          <p className="text-green-100 text-sm leading-relaxed">
            Connecting you directly with local farmers for the freshest produce,
            delivered straight to your door.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-green-100">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-green-100">
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="text-green-100 text-sm mb-4">
            Email: support@farmers.app
            <br />
            Phone: +1 (555) 123-4567
          </p>

          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition"
            >
              <img
                src="/images/inta.png"
                alt="Instagram"
                className="w-5 h-5 object-contain"
              />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition"
            >
              <img
                src="/images/tt.png"
                alt="Twitter"
                className="w-5 h-5 object-contain"
              />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition"
            >
              <img
                src="/images/fb.webp"
                alt="Facebook"
                className="w-5 h-5 object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-green-700">
        <div className="max-w-7xl mx-auto px-6 text-center text-green-200 text-sm">
          © {new Date().getFullYear()} Farmers. All rights reserved. Made with
          for fresh living.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Mail, Phone, MapPin, Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-150 to-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Farmers
              </span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Connecting you directly with local farmers for the freshest produce, delivered straight to your door.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-green-600 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-green-600 group-hover:w-4 transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-4">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-green-600 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-green-600 group-hover:w-4 transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Get in Touch</h3>
            <ul className="space-y-4">

              <li>
                <a href="mailto:support@farmers.app" className="flex items-start gap-3 text-gray-600 hover:text-green-600 transition-colors duration-200 group">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm">support@farmers.app</p>
                  </div>
                </a>
              </li>

              <li>
                <a href="tel:+15551234567" className="flex items-start gap-3 text-gray-600 hover:text-green-600 transition-colors duration-200 group">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-sm">123 Farm Lane<br />Green Valley, CA 94016</p>
                  </div>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} Farmers. All rights reserved. Made with <span className="text-green-600">❤</span>
            </p>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-green-600 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-green-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

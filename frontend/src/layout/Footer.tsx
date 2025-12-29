import { Facebook, Instagram, Youtube, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/img/icons/logo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
              <Link to="/" className="text-lg font-semibold">
                Get Some Help
              </Link>
            </div>

            <p className="font-roboto font-normal text-[14px] text-black">
              The easiest way to hire local service.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Popular Services
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Order
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Web-designers
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Marketers
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Small Business
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Website Builder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Teams
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-purple-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-start gap-6 text-black">
          <a href="#" className="hover:text-purple-600">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-purple-600">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-purple-600">
            <Youtube size={20} />
          </a>
          <a href="#" className="hover:text-purple-600">
            <Linkedin size={20} />
          </a>
          <a href="#" className="hover:text-purple-600">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

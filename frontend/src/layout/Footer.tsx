import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
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
            <FacebookIcon fontSize="small" />
          </a>
          <a href="#" className="hover:text-purple-600">
            <InstagramIcon fontSize="small" />
          </a>
          <a href="#" className="hover:text-purple-600">
            <YouTubeIcon fontSize="small" />
          </a>
          <a href="#" className="hover:text-purple-600">
            <LinkedInIcon fontSize="small" />
          </a>
          <a href="#" className="hover:text-purple-600">
            <MailOutlineIcon fontSize="small" />
          </a>
        </div>
      </div>
    </footer>
  );
}

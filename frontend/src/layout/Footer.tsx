import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
              <Link to="/" className="text-lg font-semibold">
                Get Some Help
              </Link>
            </div>

            <p className="font-roboto font-normal text-[14px] text-black">
              {t("home.title")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-black hover:text-purple-600">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-black hover:text-purple-600"
                >
                  {t("footer.popular_services")}
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-black hover:text-purple-600">
                  {t("navbar.career")}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-black hover:text-purple-600">
                  {t("navbar.help")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/career" className="text-black hover:text-purple-600">
                  {t("footer.job_application")}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-black hover:text-purple-600"
                >
                  {t("footer.hiring_worker")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-purple-600">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-black hover:text-purple-600">
                  {t("navbar.help")}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-black hover:text-purple-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/user-dashboard"
                  className="text-black hover:text-purple-600"
                >
                  {t("footer.account")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-black hover:text-purple-600">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-start gap-6 text-black">
          <Link to="#" className="hover:text-purple-600">
            <FacebookIcon fontSize="small" />
          </Link>
          <Link to="#" className="hover:text-purple-600">
            <InstagramIcon fontSize="small" />
          </Link>
          <Link to="#" className="hover:text-purple-600">
            <YouTubeIcon fontSize="small" />
          </Link>
          <Link to="#" className="hover:text-purple-600">
            <LinkedInIcon fontSize="small" />
          </Link>
          <Link to="#" className="hover:text-purple-600">
            <MailOutlineIcon fontSize="small" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { useServiceType } from "../hooks/useServiceType";
import { useTranslation } from "react-i18next";

export default function Home() {
  const services = useServiceType();
  const { t } = useTranslation();

  return (
    <main className="bg-gray-100">
      <section
        className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row items-center px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-4 text-center md:text-left md:w-1/2">
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
              {t("home.title")}
            </h1>
            <p className="text-base sm:text-lg">{t("home.subtitle")}</p>

            <div className="mt-2">
              <a
                href="#service"
                className="inline-block bg-[#7C3AED] px-5 py-3 rounded-md text-white font-bold"
              >
                {t("home.cta_button")}
              </a>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 justify-end">
            <img
              src="/img/tukang.png"
              alt="Hero"
              className="mt-16 max-w-xs md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </section>

      <section
        id="service"
        className="bg-cover bg-center bg-no-repeat py-16"
        style={{ backgroundImage: "url('/img/background/secondary-bg.png')" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 flex flex-col items-center gap-10">
          <h3 className="font-bold text-2xl sm:text-3xl text-center">
            {t("home.service_title")}
          </h3>

          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center gap-2 text-center"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${service.image}`}
                  alt={service.name}
                  className="h-12 w-12"
                />
                <h5 className="font-bold text-lg">{service.name}</h5>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <Link
            to="/catalog"
            className="px-4 py-2 bg-[#7C3AED] rounded-xl text-white font-bold flex items-center gap-2"
          >
            {t("home.service_cta_button")} <ArrowDown />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { Search } from "lucide-react";
import ServiceList from "../components/catalog/ServiceList";
import ServiceFilter from "../components/catalog/ServiceFilter";
import { useTranslation } from "react-i18next";

export default function Catalog() {
  const { t } = useTranslation();
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/background/third-bg.png')" }}
    >
      <section className="flex flex-col items-center pt-20 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#7C3AED] mb-6 text-center">
          {t("catalog.hero.title")}
        </h1>

        <div className="relative w-full max-w-3xl pb-1">
          <input
            placeholder={t("catalog.hero.search_placeholder")}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 rounded-xl shadow-md focus:ring-2 focus:ring-[#7C3AED] outline-none bg-white"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </section>

      <div className="mt-12 h-12 bg-[#7C3AED] text-lg sm:text-xl w-full flex justify-center items-center text-white">
        {t("catalog.section_title")}
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-6 px-4 sm:px-6 py-6">
          <ServiceFilter />
          <ServiceList />
        </div>
      </section>
    </main>
  );
}

import { Search } from "lucide-react";
import ServiceList from "../components/catalog/ServiceList";
import ServiceFilter from "../components/catalog/ServiceFilter";
import { useTranslation } from "react-i18next";

export default function Catalog() {
  const { t } = useTranslation();
  return (
    <main
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/background/third-bg.png')" }}
    >
      <section className="flex flex-col items-center overflow-y-hidden pt-20">
        <h1 className="text-4xl font-bold text-[#7C3AED] mb-6 text-center">
          {t("catalog.hero.title")}
        </h1>

        <div className="relative w-full max-w-3xl pb-1">
          <input
            placeholder={t("catalog.hero.search_placeholder")}
            className="w-full py-4 px-6 pr-14 rounded-xl shadow-md focus:ring-2 focus:ring-[#7C3AED] outline-none bg-white"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </section>

      <section className="mt-16">
        <div className="h-12 bg-[#7C3AED] text-xl w-full flex justify-center items-center text-white">
          {t("catalog.section_title")}
        </div>

        <div className="w-full bg-white flex pt-5">
          <ServiceFilter />
          <ServiceList />
        </div>
      </section>
    </main>
  );
}

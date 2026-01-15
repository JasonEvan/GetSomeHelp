import { useTranslation } from "react-i18next";
import { useServiceType } from "../hooks/useServiceType";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function Career() {
  const services = useServiceType();
  const { t } = useTranslation();

  const whyChooseUsLists = useMemo(
    () => [
      {
        icon: "/img/plant.png",
        title: t("career.why_us.items.advance.title"),
        description: t("career.why_us.items.advance.desc"),
        shadow: "rgba(96,165,250,0.6)",
      },
      {
        icon: "/img/job.png",
        title: t("career.why_us.items.positions.title"),
        description: t("career.why_us.items.positions.desc"),
        shadow: "rgba(74,222,128,0.6)",
      },
      {
        icon: "/img/clock.png",
        title: t("career.why_us.items.hours.title"),
        description: t("career.why_us.items.hours.desc"),
        shadow: "rgba(248,113,113,0.6)",
      },
    ],
    [t]
  );

  return (
    <main className="bg-gray-100 min-h-screen">
      <section
        className="bg-cover bg-center bg-repeat-y pt-24"
        style={{ backgroundImage: "url('/img/background/forth-bg.png')" }}
      >
        <h3 className="font-bold text-3xl ms-10">{t("career.title")}</h3>

        {/* WHY CHOOSE US */}
        <div className="w-full flex justify-center mt-14">
          <div className="max-w-5xl w-full flex flex-col items-center gap-6">
            <h3 className="font-bold text-[#3F8F93] text-3xl">
              {t("career.why_us.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
              {whyChooseUsLists.map((el, idx) => (
                <div
                  key={idx}
                  className="rounded-xl px-6 py-8 flex flex-col items-center text-center bg-white transition hover:scale-105"
                  style={{
                    boxShadow: `5px 10px 5px ${el.shadow}`,
                  }}
                >
                  <div className="mb-4">
                    <img
                      src={el.icon}
                      alt={el.title}
                      className="w-14 h-14 mx-auto"
                    />
                  </div>
                  <h5 className="font-bold text-lg mb-2">{el.title}</h5>
                  <p className="text-sm text-gray-600">{el.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES  */}
        <div className="w-full flex justify-center mt-16 pb-16">
          <div className="max-w-6xl w-full flex flex-col items-center gap-6">
            <h3 className="font-bold text-[#7A3F93] text-3xl text-center">
              {t("career.join_us.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl p-6 flex gap-6 bg-white shadow-lg hover:shadow-xl transition"
                >
                  {/* Icon */}
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${service.image}`}
                    alt={service.name}
                    className="w-14 h-14 self-start"
                  />

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h5 className="font-bold text-xl">{service.name}</h5>

                    <span className="text-sm font-semibold text-gray-500 mt-1">
                      {t("career.join_us.job_desk_label")}
                    </span>

                    <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                      {service.service_job_desks.map((job) => (
                        <li key={job.id}>{job.job_desk}</li>
                      ))}
                    </ul>
                    <Link
                      to={`/apply/${service.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="mt-6 self-end bg-[#7C3AED] text-white rounded-md py-2 px-5 text-sm font-semibold hover:bg-violet-700 transition"
                    >
                      {t("career.join_us.apply_btn")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

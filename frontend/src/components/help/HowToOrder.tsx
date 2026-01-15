import { useTranslation } from "react-i18next";
import BackToHelp from "../../layout/BackToHelp";
import { useMemo } from "react";

export default function HowToOrder() {
  const { t } = useTranslation();

  const steps = useMemo(
    () => [
      {
        step: t("help.how_to_order.steps.1.label"),
        title: t("help.how_to_order.steps.1.title"),
        description: t("help.how_to_order.steps.1.desc"),
      },
      {
        step: t("help.how_to_order.steps.2.label"),
        title: t("help.how_to_order.steps.2.title"),
        description: t("help.how_to_order.steps.2.desc"),
      },
      {
        step: t("help.how_to_order.steps.3.label"),
        title: t("help.how_to_order.steps.3.title"),
        description: t("help.how_to_order.steps.3.desc"),
      },
      {
        step: t("help.how_to_order.steps.4.label"),
        title: t("help.how_to_order.steps.4.title"),
        description: t("help.how_to_order.steps.4.desc"),
      },
    ],
    [t]
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <BackToHelp />
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          {t("help.how_to_order.title")}
        </h1>
        <p className="text-gray-600 mb-10">{t("help.how_to_order.subtitle")}</p>

        {/* Steps Card */}
        <div className="flex flex-col gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between"
            >
              <div>
                <span className="text-sm text-[#7C3AED] font-semibold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

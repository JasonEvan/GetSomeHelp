import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import BackToHelp from "../../layout/BackToHelp";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqs = useMemo(
    () => [
      {
        question: t("help.faq_page.items.q1.question"),
        answer: t("help.faq_page.items.q1.answer"),
      },
      {
        question: t("help.faq_page.items.q2.question"),
        answer: t("help.faq_page.items.q2.answer"),
      },
      {
        question: t("help.faq_page.items.q3.question"),
        answer: t("help.faq_page.items.q3.answer"),
      },
      {
        question: t("help.faq_page.items.q4.question"),
        answer: t("help.faq_page.items.q4.answer"),
      },
      {
        question: t("help.faq_page.items.q5.question"),
        answer: t("help.faq_page.items.q5.answer"),
      },
    ],
    [t]
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <BackToHelp />

        {/* Title */}
        <h1 className="text-3xl font-bold mt-6 mb-4">
          {t("help.faq_page.title")}
        </h1>
        <p className="text-gray-600 mb-10">{t("help.faq_page.subtitle")}</p>

        {/* FAQ List */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

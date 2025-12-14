import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BackToHelp from "../../layout/BackToHelp";

const faqs = [
  {
    question: "How do I order a service?",
    answer:
      "You can order a service by selecting the service type, choosing a service provider, and confirming your booking through the app.",
  },
  {
    question: "How do payments work?",
    answer:
      "All payments are processed securely through Midtrans. GetSomeHelp does not store your card or payment details.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support credit and debit cards, bank transfers (Virtual Account), QRIS, and popular e-wallets such as GoPay, OVO, DANA, and ShopeePay.",
  },
  {
    question: "Can I cancel a service?",
    answer:
      "Yes, service cancellations are subject to the service provider’s cancellation policy. Please review the policy before confirming your booking.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "If you need further assistance, you can contact our customer support team through the app or via the support contact provided on the Help page.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mb-10">
          Find quick answers to the most common questions about GetSomeHelp.
        </p>

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

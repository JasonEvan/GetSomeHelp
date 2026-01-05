import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpModal from "../layout/HelpModal";

import PaymentsContent from "../components/help-content/PaymentsContent";
import AccountContent from "../components/help-content/AccountContent";

const helpOptions = [
  {
    title: "How to order a service",
    description: "Order service guide",
    icon: "/img/support.png",
    type: "route",
    path: "/help/how-to-order",
  },
  {
    title: "Account",
    description: "Manage your account and security settings",
    icon: "/img/account-setting.png",
    type: "modal",
    modalKey: "account",
  },
  {
    title: "Payments & Billing",
    description: "Find information on accepted payment methods",
    icon: "/img/wallet.png",
    type: "modal",
    modalKey: "payments",
  },
  {
    title: "Common Questions (FAQ)",
    description: "Frequently asked questions and answers",
    icon: "/img/faq.png",
    type: "route",
    path: "/help/faq",
  },
] as const;

type ModalType = "payments" | "account" | null;

export default function Help() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <main className="min-h-screen">
        {/* Top Section */}
        <section
          className="h-[420px] bg-cover bg-center flex flex-col items-center justify-center px-6"
          style={{ backgroundImage: "url('/img/background/third-bg.png')" }}
        >
          <h1 className="text-4xl font-bold text-gray-700 mb-6 text-center">
            How can we help you?
          </h1>

          <div className="relative w-full max-w-3xl">
            <input
              placeholder="Search your question here..."
              className="w-full py-4 px-6 pr-14 rounded-xl shadow-md focus:ring-2 focus:ring-[#7C3AED] outline-none bg-white"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </section>

        {/* Help Cards */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 px-6">
          {helpOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.type === "route") {
                  navigate(item.path!);
                } else {
                  setModal(item.modalKey!);
                }
              }}
              className="bg-white rounded-xl shadow-md p-6 flex items-start gap-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gray-100">
                <img src={item.icon} alt="" className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Modals */}
        <HelpModal
          open={modal === "payments"}
          onClose={() => setModal(null)}
          title="Payments & Billing"
        >
          <PaymentsContent />
        </HelpModal>

        <HelpModal
          open={modal === "account"}
          onClose={() => setModal(null)}
          title="Account Settings"
        >
          <AccountContent />
        </HelpModal>
      </main>
    </>
  );
}

import { useState } from "react";
import SettingsTab from "../../components/dashboard/SettingsTab";
import ProfileTab from "../../components/provider-dashboard/ProfileTab";
import HistoryTab from "../../components/provider-dashboard/HistoryTab";
import ScheduleTab from "../../components/provider-dashboard/ScheduleTab";
import { useTranslation } from "react-i18next";

type TabType = "profile" | "schedule" | "settings" | "history";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[#F9FAFB] px-4 py-6 pt-20 md:flex md:items-center md:justify-center">
      <div className="w-full max-w-6xl mt-2">
        {/* Tab Header Container */}
        <div className="flex overflow-x-auto scrollbar-hide">
          <TabButton
            label={t("dashboard.provider.tabs.profile")}
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            label={t("dashboard.provider.tabs.schedule")}
            active={activeTab === "schedule"}
            onClick={() => setActiveTab("schedule")}
          />
          <TabButton
            label={t("dashboard.provider.tabs.settings")}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <TabButton
            label={t("dashboard.provider.tabs.history")}
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
        </div>

        {/* Content box */}
        <div className="bg-white rounded-tr-xl rounded-b-xl shadow-lg border border-gray-200 p-8">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "schedule" && <ScheduleTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>
      </div>
    </main>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 text-sm font-semibold border transition-all duration-200 first:rounded-tl-lg last:rounded-tr-lg    ${
        active
          ? "bg-white border-gray-200 border-b-white text-black -mb-px z-10 relative"
          : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200 border-b-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

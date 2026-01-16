import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const { t, i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">{t("settings.title")}</h2>
      <p className="text-gray-500 mb-8">{t("settings.subtitle")}</p>

      {/* content */}
      <div className="space-y-6 w-full">
        {/* language */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-semibold">{t("settings.language")}</span>

          {/* language options */}
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm cursor-pointer"
          >
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>
        </div>

        {/* notifications */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-semibold">{t("settings.notifications")}</span>

          {/* notif options */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {notifications ? "On" : "Off"}
            </span>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                notifications ? "bg-violet-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

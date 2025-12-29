import { useState } from "react";

export default function SettingsTab() {
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">Settings</h2>
      <p className="text-gray-500 mb-8">
        Manage your account preferences and notifications
      </p>

      {/* content */}
      <div className="space-y-6 w-full">
        {/* language */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Language</span>
          
          {/* language options */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          </select>
        </div>

        {/* notifications */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Notifications</span>

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

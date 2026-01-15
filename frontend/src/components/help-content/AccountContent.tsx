import { useTranslation } from "react-i18next";

export default function AccountContent() {
  const { t } = useTranslation();

  const accountActions = t("help.modal.account.actions_list", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="space-y-6 text-gray-600">
      <p>{t("help.modal.account.intro")}</p>

      <ul className="list-disc list-inside">
        {accountActions.map((action, idx) => (
          <li key={idx}>{action}</li>
        ))}
      </ul>
    </div>
  );
}

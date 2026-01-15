import { Trans, useTranslation } from "react-i18next";

export default function PaymentsContent() {
  const { t } = useTranslation();

  const paymentMethods = t("help.modal.payments.methods_list", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="space-y-6 text-gray-600">
      <p>
        <Trans
          i18nKey="help.modal.payments.intro"
          components={[
            <span className="font-semibold" key="midtrans">
              Midtrans
            </span>,
          ]}
        />
      </p>

      <div>
        <h3 className="font-bold text-gray-800 mb-1">
          {t("help.modal.payments.methods_title")}
        </h3>
        <ul className="list-disc list-inside">
          {paymentMethods.map((method, idx) => (
            <li key={idx}>{method}</li>
          ))}
        </ul>
      </div>

      <p>
        <Trans
          i18nKey="help.modal.payments.warning"
          components={[
            <span className="font-semibold" key="warning">
              NOT STORE
            </span>,
          ]}
        />
      </p>
    </div>
  );
}

export default function PaymentsContent() {
  return (
    <div className="space-y-6 text-gray-600">
      <p>
        Payments on GetSomeHelp are processed securely using{" "}
        <span className="font-semibold">Midtrans</span>.
      </p>

      <div>
        <h3 className="font-bold text-gray-800 mb-1">
          Supported Payment Methods
        </h3>
        <ul className="list-disc list-inside">
          <li>Credit & Debit Cards</li>
          <li>Bank Transfer (Virtual Account)</li>
          <li>QRIS</li>
          <li>E-wallets (GoPay, OVO, DANA, ShopeePay)</li>
        </ul>
      </div>

      <p>
        GetSomeHelp does <span className="font-semibold">NOT STORE</span> your
        card or payment information. All transactions are handled directly by
        Midtrans.
      </p>
    </div>
  );
}

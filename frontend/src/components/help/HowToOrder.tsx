
import BackToHelp from "../../layout/BackToHelp";

const steps = [
  {
    step: "Step 1",
    title: "Choose a Service",
    description:
      "Browse available services and select the one that fits your needs.",
  },
  {
    step: "Step 2",
    title: "Compare Providers",
    description:
      "Compare prices, ratings, and availability from different service providers.",
  },
  {
    step: "Step 3",
    title: "Book the Service",
    description:
      "Select your preferred date and time, then confirm your booking.",
  },
  {
    step: "Step 4",
    title: "Get It Done",
    description:
      "The service provider arrives and completes the job as scheduled.",
  },
];

export default function HowToOrder() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <BackToHelp />
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">How to Order a Service</h1>
        <p className="text-gray-600 mb-10">
          Follow these simple steps to book a service quickly and easily.
        </p>

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

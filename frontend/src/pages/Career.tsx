import { useServiceType } from "../hooks/useServiceType";
import { Link } from "react-router-dom";

const whyChooseUsLists = [
  {
    icon: "/img/plant.png",
    title: "Advance Opportunities",
    description:
      "A clear career path provides a detailed roadmap of the positions, skills, and experience needed to achieve long-term professional goals.",
    shadow: "rgba(96,165,250,0.6)", // blue
  },
  {
    icon: "/img/job.png",
    title: "Many Available Positions",
    description:
      "We currently have many job openings waiting for you. Whatever your expertise, we have a place for you.",
    shadow: "rgba(74,222,128,0.6)", // green
  },
  {
    icon: "/img/clock.png",
    title: "Flexible Working Hours",
    description:
      "Work hours are flexible and adapted to meet client needs and ensure optimal service availability.",
    shadow: "rgba(248,113,113,0.6)", // red
  },
];

export default function Career() {
  const services = useServiceType();

  return (
    <main className="bg-gray-100 min-h-screen">
      <section
        className="bg-cover bg-center bg-repeat-y pt-24"
        style={{ backgroundImage: "url('/img/background/forth-bg.png')" }}
      >
        <h3 className="font-bold text-3xl ms-10">Start your career with us</h3>

        {/* WHY CHOOSE US */}
        <div className="w-full flex justify-center mt-14">
          <div className="max-w-5xl w-full flex flex-col items-center gap-6">
            <h3 className="font-bold text-[#3F8F93] text-3xl">
              Why Choose Us?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
              {whyChooseUsLists.map((el, idx) => (
                <div
                  key={idx}
                  className="rounded-xl px-6 py-8 flex flex-col items-center text-center bg-white transition hover:scale-105"
                  style={{
                    boxShadow: `5px 10px 5px ${el.shadow}`,
                  }}
                >
                  <div className="mb-4">
                    <img
                      src={el.icon}
                      alt={el.title}
                      className="w-14 h-14 mx-auto"
                    />
                  </div>
                  <h5 className="font-bold text-lg mb-2">{el.title}</h5>
                  <p className="text-sm text-gray-600">{el.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES  */}
        <div className="w-full flex justify-center mt-16 pb-16">
          <div className="max-w-6xl w-full flex flex-col items-center gap-6">
            <h3 className="font-bold text-[#7A3F93] text-3xl text-center">
              Become one of us!
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl p-6 flex gap-6 bg-white shadow-lg hover:shadow-xl transition"
                >
                  {/* Icon */}
                  <img src={`${import.meta.env.VITE_BACKEND_URL}${service.image}`} alt={service.title} className="w-14 h-14 self-start" />

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h5 className="font-bold text-xl">{service.name}</h5>

                    <span className="text-sm font-semibold text-gray-500 mt-1">
                      Job Desk
                    </span>

                    <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                      {service.service_job_desks.map((job) => (
                        <li key={job.id}>{job.job_desk}</li>
                      ))}
                    </ul>
                    <Link
                      to={`/apply/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="mt-6 self-end bg-[#7C3AED] text-white rounded-md py-2 px-5 text-sm font-semibold hover:bg-violet-700 transition"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
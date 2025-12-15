import services from "../utils/services";
import { Link } from "react-router-dom";

const whyChooseUsLists = [
  {
    icon: "img/icons/plant.png",
    title: "Advance Opportunities",
    description:
      "A clear career path provides a detailed roadmap of the positions, skills, and experience needed to achieve long-term professional goals.",
  },
  {
    icon: "img/icons/job.png",
    title: "Many Available Positions",
    description:
      "We currently have many job openings waiting for you. Whatever your expertise, we have a place for you.",
  },
  {
    icon: "img/icons/clock.png",
    title: "Flexible Working Hours",
    description:
      "Work hours are flexible and adapted to meet client needs and ensure optimal service availability.",
  },
];

export default function Career() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <section
        className="bg-cover bg-center bg-repeat-y h-full pt-24"
        style={{ backgroundImage: "url('/img/background/forth-bg.png')" }}
      >
        <h3 className="font-bold text-3xl ms-10">Start your career with us</h3>

        <div className="w-full flex flex-col items-center mt-14 gap-5">
          <h3 className="font-bold text-[#3F8F93] text-3xl">Why Choose Us?</h3>
          <div className="grid grid-flow-row grid-cols-3 gap-5 px-10 mt-3">
            {whyChooseUsLists.map((el, idx) => (
              <div
                className="rounded-lg px-7 py-2 flex flex-col items-center gap-y-2 bg-white shadow-xl"
                key={idx}
              >
                <img src={el.icon} alt="" />
                <h5 className="font-bold text-lg">{el.title}</h5>
                <p className="text-center text-sm">{el.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-14 pb-12">
          <h3 className="font-bold text-[#7A3F93] text-3xl">
            Become one of us
          </h3>
          <div className="grid grid-flow-row grid-cols-2 gap-x-16 gap-y-5 px-10 mt-3">
            {services.map((service, index) => (
              <div
                className="rounded-lg px-7 py-2 flex items-center gap-x-5 bg-white shadow-xl"
                key={index}
              >
                <img src={service.image} alt="" />
                <div className="flex flex-col w-full">
                  <h5 className="font-bold text-xl">{service.title}</h5>
                  <p className="text-sm">Job Desk:</p>
                  {service.jobDesks.map((job, index) => (
                    <p className="text-sm" key={index}>
                      {job}
                    </p>
                  ))}
                  {/* <a
                    href=""
                    type="button"
                    className="mt-5 bg-[#7C3AED] text-white rounded-md w-fit py-2 px-4 self-end text-sm"
                  >
                    APPLY
                  </a> */}
                  <Link
                    to={`/apply/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mt-5 bg-[#7C3AED] text-white rounded-md w-fit py-2 px-4 self-end text-sm"
                  >
                    APPLY
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

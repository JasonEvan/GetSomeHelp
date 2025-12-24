import { ArrowDown } from "lucide-react";
import services from "../utils/services";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-gray-100 h-screen">
      <section
        className="bg-cover bg-center bg-no-repeat h-full flex flex-col justify-center overflow-y-hidden"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col ms-16 w-1/2 gap-y-4">
            <span className="font-extrabold text-5xl">
              The easiest way to hire local service
            </span>
            <span className="text-xl">
              Compare prices, ratings, and availability all in one place to get
              it done quicker and cheaper
            </span>
            <div className="mt-2">
              <button className="bg-[#7C3AED] px-5 py-3 rounded-md text-white font-bold cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
          <img src="/img/tukang.png" alt="" className="me-52 mt-32" />
        </div>
      </section>

      <section
        className="bg-cover bg-center bg-no-repeat h-full flex flex-col justify-around items-center"
        style={{ backgroundImage: "url('/img/background/secondary-bg.png')" }}
      >
        <h3 className="font-bold text-3xl text-center">
          Popular Service Types
        </h3>
        <div className="w-full grid grid-flow-row grid-cols-4 gap-5 p-5">
          {services.map((service, index) => (
            <div className="flex flex-col items-center gap-1" key={index}>
              <img src={service.image} alt="" width="50px" />
              <h5 className="font-bold text-xl">{service.title}</h5>
              <p className="text-center text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <Link
          type="button"
          className="px-3 py-2 bg-[#7C3AED] rounded-xl text-white font-bold flex items-center gap-x-2"
          to="/catalog"
        >
          More Services <ArrowDown />
        </Link>
      </section>

      {/* {{-- <section className="bg-[linear-gradient(to_bottom,#EFEFEF_0%,#A0E7E7_57%,#56E3E3_100%)] h-full">
            The easiest way to hire local service
        </section> --}} */}
    </main>
  );
}

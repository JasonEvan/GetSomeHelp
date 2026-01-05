import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import type { ServiceCatalogDetail } from "../../../utils/types";
import { CircleUserRound } from "lucide-react";

export default function ScheduleSection({
  bookings,
}: {
  bookings: ServiceCatalogDetail["grouped_bookings"];
}) {
  const [date, setDate] = useState<Dayjs | null>(null);
  return (
    <div className="w-3/4 bg-[#FAFAFA] rounded-lg shadow-xl p-5 space-y-2 h-fit">
      <h3 className="text-2xl">Schedule</h3>
      <div className="flex gap-x-2 max-h-80">
        {/* calendar */}
        <div className="bg-white border border-gray-300 rounded-lg p-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()}
              value={date}
              onChange={(val) => setDate(val)}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </div>
        {/* list jadwal */}
        <div className="w-full overflow-y-auto p-3 space-y-2">
          {Object.keys(bookings).length === 0 ? (
            <p>No available bookings.</p>
          ) : (
            Object.keys(bookings).map((key, index) => (
              <div key={index}>
                <h4 className="text-xl">{dayjs(key).format("DD MMMM YYYY")}</h4>
                <div className="h-0.5 bg-black w-full" />
                <div className="space-y-1 mt-2">
                  {bookings[key].map((booking) => (
                    <div
                      className="flex bg-white justify-between items-center"
                      key={booking.id}
                    >
                      <div className="flex gap-x-1.5 p-1.5">
                        <CircleUserRound size={40} />
                        <p>{booking.user.name}</p>
                      </div>
                      <div>
                        {dayjs(booking.start_time, "HH:mm:ss").format("HH:mm")}{" "}
                        - {dayjs(booking.end_time, "HH:mm:ss").format("HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

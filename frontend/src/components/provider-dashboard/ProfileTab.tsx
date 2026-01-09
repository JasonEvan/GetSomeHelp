import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import type { User } from "../../utils/types";
import api from "../../lib/axios";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Provider extends User {
  bio: string;
  starting_price: number;
  availability_days: string[];
  availability_start: string | null;
  availability_end: string | null;
}

interface ProviderAPIResponse {
  bio: string;
  starting_price: number;
  provider_application: {
    availability_days: {
      [key: string]: boolean;
    };
    start_time: string | null;
    end_time: string | null;
  };
}

export default function ProfileTab() {
  const { user, setUser } = useAuthStore();

  const [formData, setFormData] = useState<Provider>({
    ...user!,
    bio: "",
    starting_price: 0,
    availability_days: [],
    availability_start: "",
    availability_end: "",
  });

  const [initialData, setInitialData] = useState<Provider | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchProviderData() {
      try {
        const res = await api.get<{ data: ProviderAPIResponse }>(`/provider`);
        const data = res.data.data;

        const availDays = Object.entries(
          data.provider_application.availability_days
        )
          .filter(([, isAvailable]) => isAvailable)
          .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1, 3));

        const mappedData = {
          ...user!,
          bio: data.bio,
          starting_price: data.starting_price,
          availability_start: data.provider_application.start_time || "09:00",
          availability_end: data.provider_application.end_time || "17:00",
          availability_days: availDays,
        };

        setFormData(mappedData);
        setInitialData(mappedData);
      } catch (err) {
        alert("Failed to fetch provider data. Please try again.");
        console.error("Failed to fetch provider data:", err);
      }
    }

    fetchProviderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day: string) => {
    if (!isEditing) return;
    setFormData((prev) => {
      const currentDays = prev.availability_days || [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];
      return { ...prev, availability_days: updatedDays };
    });
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const dayNameMap: { [key: string]: string } = {
        Sun: "sunday",
        Mon: "monday",
        Tue: "tuesday",
        Wed: "wednesday",
        Thu: "thursday",
        Fri: "friday",
        Sat: "saturday",
      };

      const availabilityObject: { [key: string]: boolean } = {};

      daysOfWeek.forEach((shortDay) => {
        const fullDayKey = dayNameMap[shortDay];
        availabilityObject[fullDayKey] =
          formData.availability_days.includes(shortDay);
      });

      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,

        bio: formData.bio,
        starting_price: Number(formData.starting_price),

        availability_days: availabilityObject,

        start_time: formData.availability_start
          ? formData.availability_start
          : null,
        end_time: formData.availability_end ? formData.availability_end : null,
      };

      await api.put("/provider", payload);

      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        bio,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        starting_price,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        availability_days,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        availability_start,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        availability_end,
        ...userData
      } = formData;

      setUser(userData); // commit changes
      setInitialData(formData);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile. Please try again." + String(err));
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header profile */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          {/* avatar */}
          <div className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              src={`https://ui-avatars.com/api/?name=${formData.name}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">{formData.name}</h2>
            <p className="text-gray-500 text-sm">{formData.email}</p>
          </div>
        </div>

        {/* Edit / Save / Cancel */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-violet-700 cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md text-sm border hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-violet-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <Input label="Email" name="email" value={formData.email} disabled />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Service Overview / Description
          </label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-md text-sm h-full ${
              !isEditing ? "bg-gray-100" : ""
            }`}
          />
        </div>

        <div>
          <Input
            label="Starting Price"
            name="starting_price"
            value={formData.starting_price || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <div>
            {/* Availability Days */}
            <div className="mt-1">
              <p className="font-medium text-gray-700 mb-2">Availability</p>
              <div className="flex gap-2">
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={
                          formData.availability_days.includes(day) || false
                        }
                        onChange={() => handleDayChange(day)}
                        disabled={!isEditing}
                        sx={{ "&.Mui-checked": { color: "#7E3ACD" } }}
                      />
                    }
                    label={day}
                    labelPlacement="bottom"
                    sx={{ m: 0 }}
                  />
                ))}
              </div>
              {/* {formik.errors.availabilityDays && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.availabilityDays}
                </p>
              )} */}
            </div>
            {/* Availability Time */}
            <div>
              <div className="flex ml-1 mr-1 mt-4 items-center justify-between gap-4">
                <TextField
                  label="From"
                  type="time"
                  name="availability_start"
                  value={formData.availability_start || "00:00"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ width: "110%" }}
                />

                {/* Strip */}
                <div className="h-0.5 bg-gray-300 w-full"></div>

                <TextField
                  label="Until"
                  type="time"
                  name="availability_end"
                  value={formData.availability_end || "00:00"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ width: "110%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  disabled,
  ...props
}: {
  label: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`w-full mt-1 p-2 border rounded-md text-sm ${
          disabled ? "bg-gray-100" : ""
        }`}
      />
    </div>
  );
}

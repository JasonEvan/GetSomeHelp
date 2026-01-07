import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import type { User } from "../../utils/types";
import api from "../../lib/axios";

export default function ProfileTab() {
  const { user, setUser } = useAuthStore();

  const [formData, setFormData] = useState<User>(user!);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(user!);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await api.put(`/user/${formData.id}`, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        detail_address: formData.detail_address,
      });

      setUser(formData); // commit changes
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

        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Details</label>
          <textarea
            name="detail_address"
            value={formData.detail_address || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-md text-sm ${
              !isEditing ? "bg-gray-100" : ""
            }`}
          />
        </div>

        {/* Map Preview */}
        <div className="md:col-span-2 h-64 border rounded-md overflow-hidden">
          <iframe
            title="map"
            className="w-full h-full"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              formData.address || "Semarang"
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          />
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

import { useState } from "react";

export default function ProfileTab() {
  // dummy data
  const initialData = {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe123@gmail.com",
    phone: "+62 123-4566-7899",
    address: "Binus University - Anggrek",
    details: "Gedung besar depan indomaret",
  };

  // represents data already saved (like from DB)
  const [savedData, setSavedData] = useState(initialData);

  // represents editable form data
  const [formData, setFormData] = useState(initialData);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  const handleSave = () => {
    // later: API call here
    setSavedData(formData); // commit changes
    setIsEditing(false);
  };

  return (
    <div>
      {/* Header profile */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          {/* avatar */}
          <div className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              // profile picture   
              src="img/icons/user.png"
              alt="Profile"
              className="w-full h-full object-cover"

              // kalau tidak ada profile, pake inisial nama
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                const name = `${formData.firstName}+${formData.lastName}`;
                target.src = `https://ui-avatars.com/api/?name=${name}`;
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-500 text-sm">{formData.email}</p>
          </div>
        </div>

        {/* Edit / Save / Cancel */}
        {!isEditing ? ( 
          <button
            onClick={() => setIsEditing(true)}
            className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-violet-700"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md text-sm border hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Details</label>
          <textarea
            name="details"
            value={formData.details}
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
              formData.address
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

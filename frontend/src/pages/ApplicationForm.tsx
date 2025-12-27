import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  TextField,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import services from "../utils/services";
import { CloudUploadIcon } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";


const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ApplicationForm() {
  const { role } = useParams();

  const jobTitle =
    services.find(
      (s) => s.title.toLowerCase().replace(/\s+/g, "-") === role
    )?.title ?? "Job Application";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    resume: null,
    expectedSalary: 100,
    availabilityDays: [],
    availabilityStart: "",
    availabilityEnd: "",
  });

  const [errors, setErrors] = useState({});

  const [openTerms, setOpenTerms] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.resume) newErrors.resume = "Resume / CV is required";
    if (form.availabilityDays.length === 0)
      newErrors.availabilityDays = "Select at least one day";
    if (!form.availabilityStart)
      newErrors.availabilityStart = "Start time required";
    if (!form.availabilityEnd)
      newErrors.availabilityEnd = "End time required";
    if (form.availabilityStart && form.availabilityEnd && form.availabilityStart >= form.availabilityEnd)
      newErrors.availabilityEnd = "End time must be after start time";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Form submitted successfully");
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4" style={{ backgroundImage: "url('/img/background/forth-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          {jobTitle} Job Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <TextField
                label="First Name"
                fullWidth
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </div>

            <div>
              <TextField
                label="Last Name"
                fullWidth
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
          </div>
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Phone"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </div>
          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Address"
              fullWidth
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              error={!!errors.address}
              helperText={errors.address}
            />
          </div>
          {/* Resume, Salary, Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* Resume Upload */}
              <p className="font-medium text-gray-700 mb-2">
                Resume / CV
              </p>
              <div>
                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ mt: 1, color: 'black', backgroundColor: "transparent", border: '2px solid #7E3ACD','&:hover': { backgroundColor: '#eeeeeeff' }, boxShadow: 'none' }}>
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setForm({ ...form, resume: e.target.files?.[0] || null })
                    }
                  />
                </Button>
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                )}
                {form.resume && (
                  <p className="text-sm mt-1 text-gray-600">
                    Selected: {form.resume.name}
                  </p>
                )}
              </div>

              {/* Expected Salary */}
              <div className="mt-6">
                <p className="font-medium text-gray-700 mb-2">
                  Expected Salary (IDR/hour)
                </p>
                <Slider
                  value={form.expectedSalary}
                  onChange={(e, val) =>
                    setForm({ ...form, expectedSalary: val as number })
                  }
                  step={10}
                  min={100}
                  max={200}
                  valueLabelDisplay="auto"
                  sx={{width: '90%', ml: 2, mr: 2, color: '#7E3ACD'}}
                />
                <p className="text-gray-600 text-sm mx-auto text-center ">
                  {form.expectedSalary}k IDR/hour
                </p>
              </div>
            </div>
            <div>
              {/* Availability Days */}
              <div>
                <p className="font-medium text-gray-700 mb-2">Availability</p>
                <div className="flex gap-2">
                  {daysOfWeek.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={form.availabilityDays.includes(day)}
                          onChange={() => {
                            const updated = form.availabilityDays.includes(day)
                              ? form.availabilityDays.filter((d) => d !== day)
                              : [...form.availabilityDays, day];
                            setForm({ ...form, availabilityDays: updated });
                          }}
                          sx={{'&.Mui-checked': {color: '#7E3ACD'}}}
                        />
                      }
                      label={day}
                      labelPlacement="bottom"
                      sx={{m: 0}}
                    />
                  ))}
                </div>
                {errors.availabilityDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availabilityDays}
                  </p>
                )}
              </div>
              {/* Availability Time */}
              <div>
                <div className="flex ml-1 mr-1 mt-4 items-center justify-between gap-4">
                  <TextField
                    label="From"
                    type="time"
                    value={form.availabilityStart || '00:00'}
                    onChange={(e) =>
                      setForm({ ...form, availabilityStart: e.target.value })
                    }
                    error={!!errors.availabilityStart}
                    helperText={errors.availabilityStart}
                    sx={{width: '110%'}}
                  />

                  {/* Strip */}
                  <div className="h-[2px] bg-gray-300 w-full"></div>

                  <TextField
                    label="Until"
                    type="time"
                    value={form.availabilityEnd || '00:00'}
                    onChange={(e) =>
                      setForm({ ...form, availabilityEnd: e.target.value })
                    }
                    error={!!errors.availabilityEnd}
                    helperText={errors.availabilityEnd}
                    sx={{width: '110%'}}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-[#7C3AED] !py-3 !text-lg"
          >
            Send Application
          </Button>
        </form>
        <p className="font-medium text-gray-700 mt-2 text-center text-ms" onClick={() => setOpenTerms(true)}
>
          Terms and Conditions
        </p>
      </div>
      <Modal open={openTerms} onClose={() => setOpenTerms(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" component="h2" className="font-bold">
              Terms & Conditions
            </Typography>
          </div>

          <Typography sx={{ mt: 2 }} className="text-gray-700 text-sm leading-relaxed">
            By submitting this application, you confirm that all information provided
            is accurate and truthful. Your data will be used solely for recruitment
            purposes and will not be shared with third parties without your consent.
            Submitting false information may result in disqualification.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#7C3AED" }}
            onClick={() => setOpenTerms(false)}
          >
            I Understand
          </Button>
        </Box>
      </Modal>
    </main>
  );
}
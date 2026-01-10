import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import { CloudUploadIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../hooks/useAuthStore";
import api from "../lib/axios";

type ApplicationFormProps = {
  resume: File | null;
  expectedSalary: number;
  availabilityDays: string[];
  availabilityStart: string;
  availabilityEnd: string;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ApplicationForm() {
  const { role } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resume: Yup.mixed().required("Resume / CV is required"),
    availabilityDays: Yup.array()
      .min(1, "Select at least one day")
      .required("Select at least one day"),
    availabilityStart: Yup.string().required("Start time required"),
    availabilityEnd: Yup.string()
      .required("End time required")
      .test(
        "is-greater",
        "End time must be after start time",
        function (value) {
          const { availabilityStart } = this.parent;
          return !availabilityStart || !value || availabilityStart < value;
        }
      ),
  });

  const formik = useFormik<ApplicationFormProps>({
    initialValues: {
      resume: null,
      expectedSalary: 100,
      availabilityDays: [],
      availabilityStart: "",
      availabilityEnd: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const title =
        role
          ?.split("-")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" ") ?? "";

      const formData = new FormData();
      formData.set("resume", values.resume as File);
      formData.set("service_type", title);
      formData.set(
        "expected_salary",
        (values.expectedSalary * 1000).toString()
      );
      formData.set("start_time", values.availabilityStart);
      formData.set("end_time", values.availabilityEnd);

      formData.append(
        "availability[monday]",
        values.availabilityDays.includes("Mon") ? "1" : "0"
      );
      formData.append(
        "availability[tuesday]",
        values.availabilityDays.includes("Tue") ? "1" : "0"
      );
      formData.append(
        "availability[wednesday]",
        values.availabilityDays.includes("Wed") ? "1" : "0"
      );
      formData.append(
        "availability[thursday]",
        values.availabilityDays.includes("Thu") ? "1" : "0"
      );
      formData.append(
        "availability[friday]",
        values.availabilityDays.includes("Fri") ? "1" : "0"
      );
      formData.append(
        "availability[saturday]",
        values.availabilityDays.includes("Sat") ? "1" : "0"
      );
      formData.append(
        "availability[sunday]",
        values.availabilityDays.includes("Sun") ? "1" : "0"
      );

      try {
        await api.post("/provider-application", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Form submitted successfully");
        navigate("/");
      } catch (err) {
        alert("An error occured. Please try again" + err);
        console.error(err);
      }
    },
  });

  const [openTerms, setOpenTerms] = useState(false);

  const jobTitle =
    role
      ?.split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ") ?? "General";

  return (
    <main
      className="min-h-screen bg-gray-100 py-10 px-4"
      style={{
        backgroundImage: "url('/img/background/forth-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          {jobTitle} Job Application
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={user?.name || ""}
                disabled
              />
            </div>
          </div>
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={user?.email || ""}
              disabled
            />

            <TextField
              label="Phone"
              fullWidth
              name="phone"
              value={user?.phone || ""}
              disabled
            />
          </div>
          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Address"
              fullWidth
              name="address"
              value={user?.address || ""}
              disabled
            />
          </div>
          {/* Resume, Salary, Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* Resume Upload */}
              <p className="font-medium text-gray-700 mb-2">Resume / CV</p>
              <div>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    mt: 1,
                    color: "black",
                    backgroundColor: "transparent",
                    border: "2px solid #7E3ACD",
                    "&:hover": { backgroundColor: "#eeeeeeff" },
                    boxShadow: "none",
                  }}
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      formik.setFieldValue("resume", e.currentTarget.files?.[0])
                    }
                  />
                </Button>
                {formik.errors.resume && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.resume}
                  </p>
                )}
                {formik.values.resume && (
                  <p className="text-sm mt-1 text-gray-600">
                    Selected: {formik.values.resume.name}
                  </p>
                )}
              </div>

              {/* Expected Salary */}
              <div className="mt-6">
                <p className="font-medium text-gray-700 mb-2">
                  Expected Salary (IDR/hour)
                </p>
                <Slider
                  name="expectedSalary"
                  value={formik.values.expectedSalary}
                  onChange={(_, val) =>
                    formik.setFieldValue("expectedSalary", val)
                  }
                  step={10}
                  min={100}
                  max={200}
                  valueLabelDisplay="auto"
                  sx={{ width: "90%", ml: 2, mr: 2, color: "#7E3ACD" }}
                />
                <p className="text-gray-600 text-sm mx-auto text-center ">
                  {formik.values.expectedSalary}k IDR/hour
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
                          checked={formik.values.availabilityDays.includes(day)}
                          onChange={() => {
                            const updated =
                              formik.values.availabilityDays.includes(day)
                                ? formik.values.availabilityDays.filter(
                                    (d) => d !== day
                                  )
                                : [...formik.values.availabilityDays, day];
                            formik.setFieldValue("availabilityDays", updated);
                          }}
                          sx={{ "&.Mui-checked": { color: "#7E3ACD" } }}
                        />
                      }
                      label={day}
                      labelPlacement="bottom"
                      sx={{ m: 0 }}
                    />
                  ))}
                </div>
                {formik.errors.availabilityDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.availabilityDays}
                  </p>
                )}
              </div>
              {/* Availability Time */}
              <div>
                <div className="flex ml-1 mr-1 mt-4 items-center justify-between gap-4">
                  <TextField
                    label="From"
                    type="time"
                    name="availabilityStart"
                    value={formik.values.availabilityStart || "00:00"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.availabilityStart &&
                      Boolean(formik.errors.availabilityStart)
                    }
                    helperText={
                      formik.touched.availabilityStart &&
                      formik.errors.availabilityStart
                    }
                    sx={{ width: "110%" }}
                  />

                  {/* Strip */}
                  <div className="h-0.5 bg-gray-300 w-full"></div>

                  <TextField
                    label="Until"
                    type="time"
                    name="availabilityEnd"
                    value={formik.values.availabilityEnd || "00:00"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.availabilityEnd &&
                      Boolean(formik.errors.availabilityEnd)
                    }
                    helperText={
                      formik.touched.availabilityEnd &&
                      formik.errors.availabilityEnd
                    }
                    sx={{ width: "110%" }}
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
            sx={{
              bgcolor: "#7C3AED",
              py: "0.75rem",
              fontSize: "18px",
              lineHeight: 1.555556,
            }}
          >
            Send Application
          </Button>
        </form>
        <p
          className="font-medium text-gray-700 mt-2 text-center text-ms cursor-pointer"
          onClick={() => setOpenTerms(true)}
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

          <Typography
            sx={{ mt: 2 }}
            className="text-gray-700 text-sm leading-relaxed"
          >
            By submitting this application, you confirm that all information
            provided is accurate and truthful. Your data will be used solely for
            recruitment purposes and will not be shared with third parties
            without your consent. Submitting false information may result in
            disqualification.
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

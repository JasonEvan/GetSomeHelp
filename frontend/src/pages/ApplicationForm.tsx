import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        resume: Yup.mixed().required(t("application.validation.resume_req")),
        availabilityDays: Yup.array()
          .min(1, t("application.validation.days_min"))
          .required(t("application.validation.days_req")),
        availabilityStart: Yup.string().required(
          t("application.validation.start_req")
        ),
        availabilityEnd: Yup.string()
          .required(t("application.validation.end_req"))
          .test(
            "is-greater",
            t("application.validation.end_greater"),
            function (value) {
              const { availabilityStart } = this.parent;
              return !availabilityStart || !value || availabilityStart < value;
            }
          ),
      }),
    [t]
  );

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
        alert(t("application.alerts.success"));
        navigate("/");
      } catch (err) {
        alert(t("application.alerts.error"));
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
      <div className="max-w-3xl mx-auto bg-white p-5 sm:p-8 rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          {t("application.title", { role: jobTitle })}
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <TextField
                label={t("application.labels.name")}
                fullWidth
                name="name"
                value={user?.name || ""}
                disabled
              />
            </div>
          </div>
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label={t("application.labels.email")}
              fullWidth
              name="email"
              value={user?.email || ""}
              disabled
            />

            <TextField
              label={t("application.labels.phone")}
              fullWidth
              name="phone"
              value={user?.phone || ""}
              disabled
            />
          </div>
          {/* Address */}
          <div className="grid grid-cols-1">
            <TextField
              label={t("application.labels.address")}
              fullWidth
              name="address"
              value={user?.address || ""}
              disabled
            />
          </div>
          {/* Resume, Salary, Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Resume Upload */}
              <p className="font-medium text-gray-700 mb-2">
                {t("application.labels.resume")}
              </p>
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
                  {t("application.buttons.upload")}
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
                    {t("application.placeholder.file_selected", {
                      filename: formik.values.resume.name,
                    })}
                  </p>
                )}
              </div>

              {/* Expected Salary */}
              <div className="mt-6">
                <p className="font-medium text-gray-700 mb-2">
                  {t("application.labels.expected_salary")}
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
                  {t("application.placeholder.salary_display", {
                    val: formik.values.expectedSalary,
                  })}
                </p>
              </div>
            </div>
            <div>
              {/* Availability Days */}
              <div>
                <p className="font-medium text-gray-700 mb-2">
                  {t("application.labels.availability")}
                </p>
                <div className="flex flex-wrap gap-2">
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
                      label={t(`application.days.${day}` as string)}
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
                <div className="flex flex-col sm:flex-row mt-4 items-center gap-4">
                  <TextField
                    label={t("application.labels.from")}
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
                    fullWidth
                  />

                  <div className="hidden sm:block h-0.5 bg-gray-300 w-full"></div>

                  <TextField
                    label={t("application.labels.until")}
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
                    fullWidth
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
            {t("application.buttons.submit")}
          </Button>
        </form>
        <p
          className="font-medium text-gray-700 mt-2 text-center text-ms cursor-pointer"
          onClick={() => setOpenTerms(true)}
        >
          {t("application.buttons.terms_link")}
        </p>
      </div>
      <Modal open={openTerms} onClose={() => setOpenTerms(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" component="h2" className="font-bold">
              {t("application.terms_modal.title")}
            </Typography>
          </div>

          <Typography
            sx={{ mt: 2 }}
            className="text-gray-700 text-sm leading-relaxed"
          >
            {t("application.terms_modal.content")}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#7C3AED" }}
            onClick={() => setOpenTerms(false)}
          >
            {t("application.buttons.modal_close")}
          </Button>
        </Box>
      </Modal>
    </main>
  );
}

import { Modal, Box, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  open: boolean;
  onClose: () => void;
  startingPrice: number;
};

export default function BookingDetailModal({
  open,
  onClose,
  startingPrice,
}: Props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    price: Yup.number()
      .required(t("catalog.detail.modal.validation.price"))
      .min(1, t("catalog.detail.modal.validation.price")),
    date: Yup.mixed<Dayjs>()
      .required(t("catalog.detail.modal.validation.date_time"))
      .test(
        "is-valid-date",
        t("catalog.detail.modal.validation.date_time"),
        (val) => dayjs.isDayjs(val) && val.isValid()
      ),
    startTime: Yup.mixed<Dayjs>().required(
      t("catalog.detail.modal.validation.date_time")
    ),
    endTime: Yup.mixed<Dayjs>()
      .required(t("catalog.detail.modal.validation.date_time"))
      .test(
        "is-after-start-time",
        t("catalog.detail.modal.validation.time_invalid"),
        function (val) {
          const { startTime } = this.parent;
          return (
            dayjs.isDayjs(val) &&
            dayjs.isDayjs(startTime) &&
            val.isAfter(startTime)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      price: startingPrice,
      date: null as Dayjs | null,
      startTime: null as Dayjs | null,
      endTime: null as Dayjs | null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const { date, startTime } = values;

      if (date && startTime) {
        const selectedDateTime = date
          .hour(startTime.hour())
          .minute(startTime.minute());

        if (selectedDateTime.isBefore(dayjs())) {
          toast.error(t("catalog.detail.modal.validation.day_invalid"));
          return;
        }
      }

      toast.success(t("catalog.detail.modal.validation.success"));

      // Lakukan aksi booking di sini (misal: API call)
      // console.log(values);

      handleClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="bg-white rounded-xl shadow-xl p-6 outline-none"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 500,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {t("catalog.detail.modal.title")}
          </h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Service Info */}
        <div className="mb-4 text-sm text-gray-600">
          <p>
            {t("catalog.detail.modal.starting_price")}
            <b>{startingPrice}</b>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              label={t("catalog.detail.modal.placeholder1")}
              type="number"
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("catalog.detail.modal.placeholder2")}
                format="DD/MM/YYYY"
                value={formik.values.date}
                onChange={(val) => formik.setFieldValue("date", val)}
                disablePast
                slotProps={{
                  textField: {
                    error: formik.touched.date && Boolean(formik.errors.date),
                    helperText:
                      formik.touched.date && (formik.errors.date as string),
                    onBlur: () => formik.setFieldTouched("date", true),
                  },
                }}
              />

              <TimePicker
                label={t("catalog.detail.modal.placeholder3")}
                ampm={false}
                format="HH:mm"
                value={formik.values.startTime}
                onChange={(val) => formik.setFieldValue("startTime", val)}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime),
                    helperText:
                      formik.touched.startTime &&
                      (formik.errors.startTime as string),
                    onBlur: () => formik.setFieldTouched("startTime", true),
                  },
                }}
              />

              <TimePicker
                label={t("catalog.detail.modal.placeholder4")}
                ampm={false}
                format="HH:mm"
                value={formik.values.endTime}
                onChange={(val) => formik.setFieldValue("endTime", val)}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.endTime && Boolean(formik.errors.endTime),
                    helperText:
                      formik.touched.endTime &&
                      (formik.errors.endTime as string),
                    onBlur: () => formik.setFieldTouched("endTime", true),
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6 ">
            <Button onClick={onClose} variant="outlined">
              {t("catalog.detail.modal.cancel_btn")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#7c3aed",
                color: "#fff",
                "&:hover": { backgroundColor: "#6d28d9" },
              }}
            >
              {t("catalog.detail.modal.submit_btn")}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

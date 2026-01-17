import { Modal, Box, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
  const [price, setPrice] = useState<number | "">(startingPrice);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!price || price <= 0) {
      toast.error(t("catalog.detail.modal.validation.price"));
      return;
    }

    if (!date || !startTime || !endTime) {
      toast.error(t("catalog.detail.modal.validation.date_time"));
      return;
    }

    const selectedDateTime = date
      .hour(startTime.hour())
      .minute(startTime.minute());

    if (selectedDateTime.isBefore(dayjs())) {
      toast.error(t("catalog.detail.modal.validation.day_invalid"));
      return;
    }

    toast.success(t("catalog.detail.modal.validation.success"));
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label={t("catalog.detail.modal.placeholder1")}
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t("catalog.detail.modal.placeholder2")}
              value={date}
              onChange={(val) => setDate(val)}
              disablePast
            />

            <TimePicker
              label={t("catalog.detail.modal.placeholder3")}
              value={startTime}
              onChange={(val) => setStartTime(val)}
            />

            <TimePicker
              label={t("catalog.detail.modal.placeholder4")}
              value={endTime}
              onChange={(val) => setEndTime(val)}
            />
          </LocalizationProvider>
        </Box>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6 ">
          <Button onClick={onClose} variant="outlined">
            {t("catalog.detail.modal.cancel_btn")}
          </Button>
          <Button
            onClick={handleSubmit}
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
      </Box>
    </Modal>
  );
}

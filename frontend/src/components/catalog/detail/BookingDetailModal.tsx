import { Modal, Box, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const [time, setTime] = useState<Dayjs | null>(null);

  const handleSubmit = () => {
    if (!price || price <= 0) {
      toast.error("Please enter a valid price quotation");
      return;
    }

    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }

    const selectedDateTime = date
      .hour(time.hour())
      .minute(time.minute());

    if (selectedDateTime.isBefore(dayjs())) {
      toast.error("Schedule must be in the future");
      return;
    }
    
    toast.success("Booking request submitted!");
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
          <h2 className="text-xl font-bold">Request Booking</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Service Info */}
        <div className="mb-4 text-sm text-gray-600">
          <p>
            Starting price: <b>{startingPrice}</b>
          </p>
        </div>

        {/* Form */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Your price quotation"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select date"
              value={date}
              onChange={(val) => setDate(val)}
              disablePast
            />

            <TimePicker
              label="Select time"
              value={time}
              onChange={(val) => setTime(val)}
            />
          </LocalizationProvider>
        </Box>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6 ">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#7c3aed",
              color: "#fff",
              '&:hover': { backgroundColor: '#6d28d9' },
            }}
          >
            Submit Request
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

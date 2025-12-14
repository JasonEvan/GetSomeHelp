import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type HelpModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function HelpModal({
  open,
  onClose,
  title,
  children,
}: HelpModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 700,
          maxHeight: "85vh",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          aria-label="close"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#6B7280",
            "&:hover": {
              color: "#111827",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 pr-8">
          {title}
        </h2>

        {children}
      </Box>
    </Modal>
  );
}

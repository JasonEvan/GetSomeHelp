import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";

export default function Forbidden403() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
        <BlockIcon sx={{ fontSize: 80, color: "#EF4444" }} />

        <Typography variant="h3" className="font-bold mt-4">
          403
        </Typography>

        <Typography variant="h6" className="mt-2 text-gray-600">
          Access Forbidden
        </Typography>

        <Typography className="mt-4 text-gray-500">
          You don’t have permission to access this page.
        </Typography>

        <div className="flex gap-4 mt-8 justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </Box>
    </div>
  );
}

import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import { useTranslation } from "react-i18next";

export default function Forbidden403() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
        <BlockIcon sx={{ fontSize: 80, color: "#EF4444" }} />

        <Typography variant="h3" className="font-bold mt-4">
          403
        </Typography>

        <Typography variant="h6" className="mt-2 text-gray-600">
          {t("forbidden.title")}
        </Typography>

        <Typography className="mt-4 text-gray-500">
          {t("forbidden.subtitle")}
        </Typography>

        <div className="flex gap-4 mt-8 justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            {t("forbidden.cta_home_button")}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            {t("forbidden.cta_back_button")}
          </Button>
        </div>
      </Box>
    </div>
  );
}

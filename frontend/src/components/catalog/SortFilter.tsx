import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";
import { useTranslation } from "react-i18next";

export default function SortFilter() {
  const { sortBy, setSortBy } = useServiceCatalogStore();
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] text-[#5E17D7] px-2 py-1">
        {t("catalog.filter.sort.title")}
      </div>
      <div className="bg-[#F5F5F5] border-[#D9D9D9] border p-5">
        <FormControl>
          <RadioGroup
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | "name"
                  | "lowest_price"
                  | "highest_price"
                  | "rating"
              )
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem",
                color: "#5E17D7",
              },
            }}
          >
            <FormControlLabel
              value="name"
              control={<Radio />}
              label={t("catalog.filter.sort.name")}
            />
            <FormControlLabel
              value="lowest_price"
              control={<Radio />}
              label={t("catalog.filter.sort.lowest_price")}
            />
            <FormControlLabel
              value="highest_price"
              control={<Radio />}
              label={t("catalog.filter.sort.highest_price")}
            />
            <FormControlLabel
              value="rating"
              control={<Radio />}
              label={t("catalog.filter.sort.user_rating")}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

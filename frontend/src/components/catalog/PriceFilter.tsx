import { Slider } from "@mui/material";
import { useState } from "react";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";
import { useTranslation } from "react-i18next";

export default function PriceFilter() {
  const priceRange = useServiceCatalogStore((state) => state.priceRange);
  const setPriceRange = useServiceCatalogStore((state) => state.setPriceRange);
  const [value, setValue] = useState<number>(60);
  const { t } = useTranslation();

  function handleChange(_: Event, newValue: number) {
    setValue(newValue);
    setPriceRange(newValue as 10 | 20 | 30 | 40 | 50 | 60);
  }

  const renderPriceLabel = () => {
    if (priceRange[0] === -1 && priceRange[1] === -1) {
      return t("catalog.filter.price.any");
    }

    if (priceRange[1] === -1) {
      return t("catalog.filter.price.above", { val: priceRange[0] });
    }

    return t("catalog.filter.price.range", {
      min: priceRange[0],
      max: priceRange[1],
    });
  };

  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] text-[#5E17D7] px-2 py-1">
        {t("catalog.filter.price.title")}
      </div>
      <div className="bg-[#F5F5F5] border-[#D9D9D9] border p-5">
        <Slider
          defaultValue={60}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          step={10}
          marks
          min={10}
          max={60}
          sx={{
            color: "#5E17D7",
          }}
        />
        <p className="text-[#5E17D7] text-center font-medium">
          {renderPriceLabel()}
        </p>
      </div>
    </div>
  );
}

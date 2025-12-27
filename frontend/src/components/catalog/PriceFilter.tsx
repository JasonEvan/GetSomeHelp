import { Slider } from "@mui/material";
import { useState } from "react";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";

export default function PriceFilter() {
  const priceRange = useServiceCatalogStore((state) => state.priceRange);
  const setPriceRange = useServiceCatalogStore((state) => state.setPriceRange);
  const [value, setValue] = useState<number>(60);
  function handleChange(_: Event, newValue: number) {
    setValue(newValue);
    setPriceRange(newValue as 10 | 20 | 30 | 40 | 50 | 60);
  }

  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] text-[#5E17D7] px-2 py-1">
        Narrow by Price
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
        {priceRange[0] === -1 && priceRange[1] === -1 ? (
          <p className="text-[#5E17D7] text-center">Any Price</p>
        ) : priceRange[1] === -1 ? (
          <p className="text-[#5E17D7] text-center">Above {priceRange[0]}</p>
        ) : (
          <p className="text-[#5E17D7] text-center">{`${priceRange[0]} - ${priceRange[1]}`}</p>
        )}
      </div>
    </div>
  );
}

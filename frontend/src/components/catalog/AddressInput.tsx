import { TextField } from "@mui/material";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";

export default function AddressInput() {
  const { address, setAddress } = useServiceCatalogStore();
  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] text-[#5E17D7] px-2 py-1">Your Address</div>
      <div className="bg-[#F5F5F5] border-[#D9D9D9] border p-5 flex flex-col gap-y-3">
        <TextField
          label="Your Address"
          variant="outlined"
          sx={{ width: "100%" }}
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
        />
        <TextField
          label="Details"
          variant="outlined"
          sx={{ width: "100%" }}
          value={address.detail}
          onChange={(e) => setAddress({ ...address, detail: e.target.value })}
        />
      </div>
    </div>
  );
}

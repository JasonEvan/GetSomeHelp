import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";
import { useServiceType } from "../../hooks/useServiceType";

export default function TypeFilter() {
  const services = useServiceType();
  const { types, setTypes } = useServiceCatalogStore();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newType: number
  ) => {
    if (event.target.checked) {
      setTypes([...types, newType]);
    } else {
      setTypes(types.filter((t) => t !== newType));
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] text-[#5E17D7] px-2 py-1">
        Narrow by Type
      </div>
      <div className="bg-[#F5F5F5] border-[#D9D9D9] border p-5">
        <FormGroup>
          <Grid container>
            {services.map((service) => (
              <Grid key={service.id} size={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={types.includes(service.id)}
                      onChange={(e) => handleChange(e, service.id)}
                    />
                  }
                  label={service.name}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                      color: "#5E17D7",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </div>
    </div>
  );
}

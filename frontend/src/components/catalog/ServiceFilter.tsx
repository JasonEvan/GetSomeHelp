import AddressInput from "./AddressInput";
import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";
import TypeFilter from "./TypeFilter";

export default function ServiceFilter() {
  return (
    <div className="px-5 w-1/4 flex flex-col items-center gap-y-2">
      <PriceFilter />
      <TypeFilter />
      <SortFilter />
      <AddressInput />
    </div>
  );
}

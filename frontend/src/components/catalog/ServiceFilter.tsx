import AddressInput from "./AddressInput";
import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";
import TypeFilter from "./TypeFilter";

export default function ServiceFilter() {
  return (
    <div className="w-full md:w-1/4 flex flex-col gap-y-4">
      <PriceFilter />
      <TypeFilter />
      <SortFilter />
      <AddressInput />
    </div>
  );
}

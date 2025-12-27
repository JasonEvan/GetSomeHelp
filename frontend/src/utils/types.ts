export interface ServiceCatalog {
  display_name: string;
  city: string;
  starting_price: number;
  rating: number;
  experience_years: number;
  service_type: {
    name: string;
    image: string;
  };
}

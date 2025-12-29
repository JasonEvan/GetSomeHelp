export interface ServiceCatalog {
  display_name: string;
  city: string;
  starting_price: number;
  rating: number;
  experience_years: number;
  img_path: string | null;
  service_type: {
    name: string;
    image: string;
  };
}

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  image: string;
  service_job_desks: {
    id: number;
    job_desk: string;
  }[];
}

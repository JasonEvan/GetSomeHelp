export interface ServiceCatalog {
  id: number;
  display_name: string;
  bio: string;
  city: string;
  starting_price: number;
  rating: number;
  experience_years: number;
  img_path: string | null;
  service_type: {
    name: string;
    description: string;
  };
}

export interface ServiceCatalogDetail extends ServiceCatalog {
  reviews: {
    id: number;
    rating: number;
    comment: string;
    user: {
      id: number;
      name: string;
    };
  }[];
  grouped_bookings: Record<string, Booking[]>;
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

interface Booking {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  user: {
    id: number;
    name: string;
  };
}

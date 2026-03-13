export type ProfileData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string,
  store_name: string;
  number_of_stores: number | null;
  type_of_industry: string;
  message?: string;
  demo_requested?: boolean;
  emails_accepted: boolean;
};

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type CountriesAPIResponse = APIResponse<{
  name: string;
  code: string;
}[]>;

export type Times = APIResponse<{
  date: string;
  sunrise: string;
  sunset: string;
  timezone: string;
}>;
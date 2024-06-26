import { Action } from "@app/types/Action";

export enum Actions {
  GET_TOURS_START = '@tours/GET_TOURS_START',
  GET_TOURS_FULFILLED = '@tours/GET_TOURS_FULFILLED',
  GET_TOURS_FAILED = '@tours/GET_TOURS_FAILED',
  GET_TOUR_INFO_START = '@tours/GET_TOUR_INFO_START',
  GET_TOUR_INFO_FULFILLED = '@tours/GET_TOUR_INFO_FULFILLED',
  GET_TOUR_INFO_FAILED = '@tours/GET_TOUR_INFO_FAILED',
  GET_TRIPS_START = '@trips/GET_TRIPS_START',
  GET_TRIPS_FULFILLED = '@trips/GET_TRIPS_FULFILLED',
  GET_TRIPS_FAILED = '@trips/GET_TRIPS_FAILED',
}

export type TTourResponse = {
  id: number;
  view_priority: number;
  tour_slug: string;
  tour_title: string;
  tour_banner_image: string;
  package_details: string;
  thumbnail: string;
  price: number;
  discount: number;
  gallery: string[];
  location_caption: string;
  per_pax_price: number;
  min_pax: number;
};

export type TToursResponse = {
  id: number;
  tour_slug: string;
  tour_title: string;
  package_details: string;
  price: number;
  discount: number;
  thumbnail: string;
  tour_banner_image: string;
  location: string;
  reviews: number;
  numberReviews: number;
  gallery: string[];
};

export type TTripsResponse = {
  id: string | number;
  thumbnail: string;
  title: string;
  package_details: string;
  price: number;
  discount: number;
};

export interface ToursState {
  isLoading?: boolean;
  selectedTour: TTourResponse | null;
  tours: TToursResponse[];
  trips: TTripsResponse[];
  totalRecords: number;
}

export type GetToursRequest = Action<typeof Actions.GET_TOURS_START>;
export type GetToursAction = Action<typeof Actions.GET_TOURS_FULFILLED, { records: TToursResponse[]; totalRecords: number }>;
export type GetToursFailed = Action<typeof Actions.GET_TOURS_FAILED>;

export type GetTourInfoRequest = Action<typeof Actions.GET_TOUR_INFO_START>;
export type GetTourInfoAction = Action<typeof Actions.GET_TOUR_INFO_FULFILLED, TTourResponse>;
export type GetTourInfoFailed = Action<typeof Actions.GET_TOUR_INFO_FAILED>;

export type GetTripsRequest = Action<typeof Actions.GET_TRIPS_START>;
export type GetTripsAction = Action<typeof Actions.GET_TRIPS_FULFILLED, TTripsResponse[]>;
export type GetTripsFailed = Action<typeof Actions.GET_TRIPS_FAILED>;

export type ToursTypes = 
  | GetToursRequest
  | GetToursAction
  | GetToursFailed
  | GetTourInfoRequest
  | GetTourInfoAction
  | GetTourInfoFailed
  | GetTripsRequest
  | GetTripsAction
  | GetTripsFailed;
import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

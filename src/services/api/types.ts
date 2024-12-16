export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export interface JobSourceConfig {
  name: string;
  baseUrl: string;
  headers?: Record<string, string>;
  transformResponse?: (data: any) => Job;
}

export interface FetchOptions {
  query?: string;
  location?: string;
  jobType?: string;
  page?: number;
  limit?: number;
}
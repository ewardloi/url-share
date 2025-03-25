import { getToken } from "../helpers/tokenHelper";
import type { Response } from "../types/api";

export const getUrl = (path: string, params?: string) => {
  const url = `${path.startsWith("/") ? path : `/${path}`}`;

  return params && params.length > 0 ? `${url}?${params}` : url;
};

export const getHeaders = (): Record<string, string> => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const request = async <TReq, TRes>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  { params, body }: { params?: string; body?: TReq } = {},
): Promise<Response<TRes>> => {
  const response = await fetch(getUrl(path, params), {
    body: body ? JSON.stringify(body) : null,
    method: method,
    headers: getHeaders(),
  });

  return (await response.json()) as Response<TRes>;
};

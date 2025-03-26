import * as api from "./api";

import type { LoginRequest, LoginResponse, Response } from "../types/api";

export const login = async (
  request: LoginRequest,
): Promise<Response<LoginResponse>> => {
  return await api.request<LoginRequest, LoginResponse>("POST", "/token", {
    body: request,
  });
};

export const renew = async (): Promise<Response<LoginResponse>> => {
  return await api.request<void, LoginResponse>("POST", "/token/renew");
};

import * as api from "./api";
import { setToken } from "../helpers/tokenHelper";

import type { LoginRequest, LoginResponse } from "../types/api";

export const login = async (request: LoginRequest): Promise<boolean> => {
  try {
    const response = await api.request<LoginRequest, LoginResponse>(
      "POST",
      "/token",
      { body: request },
    );

    const accessToken = response.data?.accessToken;

    if (accessToken) {
      setToken(accessToken);
    }

    return !!accessToken;
  } catch {
    return false;
  }
};

export const renew = async (): Promise<boolean> => {
  try {
    const response = await api.request<void, LoginResponse>(
      "POST",
      "/token/renew",
    );

    const accessToken = response.data?.accessToken;

    if (accessToken) {
      setToken(accessToken);
    }

    return !!accessToken;
  } catch {
    return false;
  }
};

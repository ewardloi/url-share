import { Tunnel } from "./app";

export type Response<T> = {
  data: T;
  message: string;
  status: number;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type CreateTunnelRequest = {
  url: string;
};

export type GetTunnelResponse = Tunnel;

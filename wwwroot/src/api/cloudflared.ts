import * as api from "./api";
import type {
  CreateTunnelRequest,
  GetTunnelResponse,
  Response,
} from "../types/api";

export const create = async (
  request: CreateTunnelRequest,
): Promise<Response<GetTunnelResponse>> => {
  return await api.request<CreateTunnelRequest, GetTunnelResponse>(
    "POST",
    "/cloudflared",
    {
      body: request,
    },
  );
};

export const getAll = async (): Promise<Response<GetTunnelResponse[]>> => {
  return await api.request<void, GetTunnelResponse[]>("GET", "/cloudflared");
};

export const close = async (id: string): Promise<Response<void>> => {
  return await api.request<void, void>("DELETE", `/cloudflared/${id}`);
};

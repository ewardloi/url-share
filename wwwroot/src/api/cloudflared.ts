import * as api from "./api";
import type { CreateTunnelRequest, GetTunnelResponse } from "../types/api";

export const create = async (
  request: CreateTunnelRequest,
): Promise<GetTunnelResponse | null> => {
  try {
    return (
      await api.request<CreateTunnelRequest, GetTunnelResponse>(
        "POST",
        "/cloudflared",
        {
          body: request,
        },
      )
    ).data;
  } catch {
    return null;
  }
};

export const getAll = async (): Promise<GetTunnelResponse[] | null> => {
  try {
    return (await api.request<void, GetTunnelResponse[]>("GET", "/cloudflared"))
      .data;
  } catch {
    return null;
  }
};

export const close = async (id: string): Promise<boolean> => {
  try {
    return !!(await api.request<void, void>("DELETE", `/cloudflared/${id}`));
  } catch {
    return false;
  }
};

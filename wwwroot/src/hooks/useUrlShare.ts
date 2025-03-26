import { useEffect, useState } from "react";
import { useSnackbar } from "./useSnackbar";
import { getToken } from "../helpers/tokenHelper";
import * as cloudflaredApi from "../api/cloudflared";
import type { Tunnel } from "../types/app";

export function useUrlShare() {
  const [urlShares, setUrlShares] = useState<Tunnel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSnackbar } = useSnackbar();

  const fetchUrlShares = async () => {
    setIsLoading(true);

    try {
      const response = await cloudflaredApi.getAll();
      const urlShares = response.data;

      if (urlShares == null) {
        throw new Error("Failed to fetch url shares");
      }

      setUrlShares(urlShares);
    } catch {
      setSnackbar("Failed to fetch url shares");
    } finally {
      setIsLoading(false);
    }
  };

  const addUrlShare = (urlShare: Tunnel) => {
    setUrlShares((value) => [...value, urlShare]);
  };

  const deleteUrlShare = async (id: string) => {
    setIsLoading(true);

    try {
      await cloudflaredApi.close(id);
      setUrlShares((value) => value.filter((u) => u.id !== id));
    } catch {
      setSnackbar(`Failed to close url shares with id ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (getToken()) fetchUrlShares();
  }, []);

  return {
    isLoading,
    urlShares,
    addUrlShare,
    deleteUrlShare,
    fetchUrlShares,
  };
}

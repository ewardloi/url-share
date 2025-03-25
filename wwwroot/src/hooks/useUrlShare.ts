import { useEffect, useState } from "react";
import { useSnackbar } from "./useSnackbar";
import { getToken } from "../helpers/tokenHelper";
import * as cloudflaredApi from "../api/cloudflared";
import type { Tunnel } from "../types/app";

export function useUrlShare() {
  const [urlShares, setUrlShares] = useState<Tunnel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbar();

  const fetchUrlShares = async () => {
    setIsLoading(true);

    const urlShares = await cloudflaredApi.getAll();

    if (urlShares == null) {
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to fetch url shares");
      return;
    }

    setUrlShares(urlShares);
    setIsLoading(false);
  };

  const addUrlShare = (urlShare: Tunnel) => {
    setUrlShares((value) => [...value, urlShare]);
  };

  const deleteUrlShare = async (id: string) => {
    setIsLoading(true);

    await cloudflaredApi.close(id);
    setUrlShares((value) => value.filter((u) => u.id !== id));

    setIsLoading(false);
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

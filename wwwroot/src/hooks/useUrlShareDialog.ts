import { FormEvent, useState } from "react";
import { useSnackbar } from "./useSnackbar";
import * as cloudflaredApi from "../api/cloudflared";
import type { Tunnel } from "../types/app";

export type UseUrlShareDialogProps = {
  onCreated: (urlShare: Tunnel) => void;
};

export function useUrlShareDialog(props: UseUrlShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSnackbar } = useSnackbar();

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const form = Object.fromEntries(formData.entries());

    try {
      const response = await cloudflaredApi.create({ url: form.url as string });

      const urlShare = response.data;

      if (!urlShare) {
        throw new Error("Failed to create URL share");
      }

      setSnackbar(`URL share created successfully: ${urlShare.publicUrl}`);
      setOpen(false);

      props.onCreated(urlShare);
      await navigator.clipboard.writeText(urlShare.publicUrl);
    } catch (e) {
      setSnackbar("Failed to create URL share");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    open,
    isLoading,
    setOpen,
    onClose,
    onSubmit,
  };
}

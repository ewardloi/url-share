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

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbar();

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const form = Object.fromEntries(formData.entries());

    const share = await cloudflaredApi.create({ url: form.url as string });

    setSnackbarOpen(true);
    setSnackbarMessage(
      share
        ? `URL share created successfully: ${share.publicUrl}`
        : `Failed to create URL share`,
    );
    setOpen(!share);

    if (share) {
      props.onCreated(share);
      await navigator.clipboard.writeText(share.publicUrl);
    }

    setIsLoading(false);
  };

  return {
    open,
    isLoading,
    setOpen,
    onClose,
    onSubmit,
  };
}

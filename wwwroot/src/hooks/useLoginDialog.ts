import { FormEvent, useEffect, useState } from "react";
import { getToken } from "../helpers/tokenHelper";
import { useSnackbar } from "./useSnackbar";
import * as tokenApi from "../api/token";

export type LoginDialogProps = {
  onAfterLogin: () => void;
};

export function useLoginDialog(props: LoginDialogProps) {
  const [open, setOpen] = useState(() => !getToken());
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

    const authorized = await tokenApi.login({
      username: form.username as string,
      password: form.password as string,
    });

    setOpen(!authorized);

    if (!authorized) {
      setSnackbarMessage("Invalid username or password");
      setSnackbarOpen(true);
    }

    if (authorized) {
      props.onAfterLogin();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!getToken()) {
      setOpen(true);
    }
  }, [open]);

  return {
    open,
    isLoading,
    setOpen,
    onClose,
    onSubmit,
  };
}

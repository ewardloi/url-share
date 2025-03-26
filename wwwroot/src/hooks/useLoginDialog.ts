import { FormEvent, useEffect, useState } from "react";
import { getToken, setToken } from "../helpers/tokenHelper";
import { useSnackbar } from "./useSnackbar";
import * as tokenApi from "../api/token";

export type LoginDialogProps = {
  onAfterLogin: () => void;
};

export function useLoginDialog(props: LoginDialogProps) {
  const [open, setOpen] = useState(() => !getToken());
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
      const response = await tokenApi.login({
        username: form.username as string,
        password: form.password as string,
      });

      const accessToken = response.data?.accessToken;

      if (!accessToken) throw new Error("Invalid username or password");

      setToken(accessToken);
      setOpen(false);
      props.onAfterLogin();
    } catch {
      setSnackbar("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
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

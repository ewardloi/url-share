import { ReactNode, useState } from "react";
import { SnackbarContext } from "./SnackbarContext";

export type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const setSnackbar = (message: string) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        snackbarMessage,
        setSnackbar,
        closeSnackbar,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

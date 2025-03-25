import { ReactNode, useState } from "react";
import { SnackbarContext } from "./SnackbarContext";

export type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

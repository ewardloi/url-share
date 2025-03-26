import { createContext } from "react";

export type SnackbarContext = {
  snackbarMessage: string;
  snackbarOpen: boolean;
  setSnackbar: (message: string) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContext>({
  snackbarMessage: "",
  snackbarOpen: false,
  setSnackbar: () => {},
  closeSnackbar: () => {},
});

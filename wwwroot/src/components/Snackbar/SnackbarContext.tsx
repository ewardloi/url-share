import { createContext } from "react";

export type SnackbarContext = {
  snackbarMessage: string;
  snackbarOpen: boolean;
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContext>({
  snackbarMessage: "",
  snackbarOpen: false,
  setSnackbarOpen: () => {},
  setSnackbarMessage: () => {},
});

import { useContext } from "react";
import { SnackbarContext } from "../components/Snackbar/SnackbarContext";

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

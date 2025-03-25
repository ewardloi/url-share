import { useSnackbar } from "../../hooks/useSnackbar";
import { Snackbar as MuiSnackbar } from "@mui/material";

const TIMEOUT_MS = 5000;

export function Snackbar() {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage } = useSnackbar();

  return (
    <MuiSnackbar
      open={snackbarOpen}
      autoHideDuration={TIMEOUT_MS}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={snackbarMessage}
    />
  );
}

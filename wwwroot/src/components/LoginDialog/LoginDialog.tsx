import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

export type LoginDialogProps = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function LoginDialog(props: LoginDialogProps) {
  return (
    <>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.onClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: props.onSubmit,
          },
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button loading={props.isLoading} type="submit">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

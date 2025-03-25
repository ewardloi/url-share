import { FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export type UrlShareDialogProps = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function UrlShareDialog(props: UrlShareDialogProps) {
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
        <DialogTitle>Create URL Share</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="url"
            name="url"
            label="Local URL"
            type="url"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Close</Button>
          <Button loading={props.isLoading} type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

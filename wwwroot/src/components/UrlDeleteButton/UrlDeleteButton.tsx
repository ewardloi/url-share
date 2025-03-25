import { SpeedDial, SpeedDialIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import * as colors from "../../styles/colors";
import * as offsets from "../../styles/offsets";

export type UrlDeleteButtonProps = {
  onClick: () => void;
};

export function UrlDeleteButton(props: UrlDeleteButtonProps) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial Delete"
      sx={{
        position: "fixed",
        bottom: offsets.speedDialButtonOffset,
        right: offsets.speedDialRightOffset,
        "& .MuiFab-primary": {
          backgroundColor: colors.redColor,
          color: "white",
          "&:hover": {
            backgroundColor: colors.redColorDark,
          },
        },
      }}
      onClick={props.onClick}
      icon={
        <SpeedDialIcon
          icon={<DeleteOutlineIcon />}
          openIcon={<DeleteIcon />}
          sx={{ color: "white" }}
        />
      }
    />
  );
}

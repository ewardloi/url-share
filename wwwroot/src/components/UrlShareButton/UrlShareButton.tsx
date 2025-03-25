import { SpeedDial, SpeedDialIcon } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import * as offsets from "../../styles/offsets";

export type UrlShareButtonProps = {
  onClick: () => void;
};

export function UrlShareButton(props: UrlShareButtonProps) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial Share"
      sx={{
        position: "fixed",
        bottom: offsets.speedDialButtonOffset,
        right: offsets.speedDialRightOffset,
      }}
      onClick={props.onClick}
      icon={<SpeedDialIcon openIcon={<ShareIcon />} />}
    />
  );
}

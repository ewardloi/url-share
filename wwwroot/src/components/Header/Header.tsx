import { Typography } from "@mui/material";

export type HeaderProps = {
  title: string;
};

export function Header(props: HeaderProps) {
  return (
    <>
      <Typography variant="h2" component="h3">
        {props.title}
      </Typography>
    </>
  );
}

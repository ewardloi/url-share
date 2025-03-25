import { Header } from "./components/Header";
import { UrlShareButton } from "./components/UrlShareButton";
import { Snackbar } from "./components/Snackbar";
import { UrlShareTable } from "./components/UrlShareTable";
import { LoginDialog } from "./components/LoginDialog";
import { UrlShareDialog } from "./components/UrlShareDialog";
import { UrlDeleteButton } from "./components/UrlDeleteButton";
import { useApp } from "./hooks/useApp.ts";

import "./styles/fonts.ts";

export function App() {
  const app = useApp();

  return (
    <>
      <Header title="Url Share" />
      <UrlShareTable {...app.urlShareTable} />
      <LoginDialog {...app.loginDialog} />
      <UrlShareDialog {...app.urlShareDialog} />
      {app.selectedRows.length > 0 ? (
        <UrlDeleteButton onClick={app.onDeleteUrlSharesClick} />
      ) : (
        <UrlShareButton onClick={app.onCreateUrlShareClick} />
      )}
      <Snackbar />
    </>
  );
}

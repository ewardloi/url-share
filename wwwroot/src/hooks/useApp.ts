import { useState } from "react";
import { useLoginDialog } from "./useLoginDialog";
import { useUrlShareDialog } from "./useUrlShareDialog";
import { useUrlShare } from "./useUrlShare";
import { useTokenRenew } from "./useTokenRenew";

import type { Tunnel } from "../types/app";

export function useApp() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { urlShares, addUrlShare, deleteUrlShare, fetchUrlShares, isLoading } =
    useUrlShare();

  const { setOpen: setLoginDialogOpen, ...loginDialog } = useLoginDialog({
    onAfterLogin: fetchUrlShares,
  });

  const { setOpen: setUrlShareDialogOpen, ...urlShareDialog } =
    useUrlShareDialog({
      onCreated: (share: Tunnel) => addUrlShare(share),
    });

  useTokenRenew({
    onRenewFailed: () => setLoginDialogOpen(true),
  });

  const onCreateUrlShareClick = () => {
    return setUrlShareDialogOpen(true);
  };

  const onDeleteUrlShareClick = (id: string) => deleteUrlShare(id);

  const onDeleteUrlSharesClick = () => {
    for (const id of selectedRows) {
      deleteUrlShare(id);
    }

    setSelectedRows([]);
  };

  const urlShareTable = {
    isLoading,
    urlShares,
    setSelectedRows,
    onDeleteUrlShareClick,
  };

  return {
    urlShareTable,
    selectedRows,
    loginDialog,
    urlShareDialog,
    onCreateUrlShareClick,
    onDeleteUrlSharesClick,
  };
}

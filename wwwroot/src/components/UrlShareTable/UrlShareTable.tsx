import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import * as layouts from "../../styles/layouts";
import type { Tunnel } from "../../types/app";

const getColumns = (onDeleteClick: (id: string) => void): GridColDef[] => [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "localUrl", headerName: "Local URL", flex: 5 },
  { field: "publicUrl", headerName: "Public URL", flex: 5 },
  {
    field: "action",
    headerName: "",
    flex: 1,
    align: "right",
    renderCell: (params) => (
      <IconButton color="error" onClick={() => onDeleteClick(params.row.id)}>
        <DeleteOutlineIcon />
      </IconButton>
    ),
  },
];

export type UrlShareTableProps = {
  urlShares: Tunnel[];
  isLoading: boolean;
  setSelectedRows: (ids: string[]) => void;
  onDeleteUrlShareClick: (id: string) => void;
};

export function UrlShareTable(props: UrlShareTableProps) {
  return (
    <Paper sx={layouts.urlShareTable}>
      <DataGrid
        loading={props.isLoading}
        rows={props.urlShares}
        columns={getColumns(props.onDeleteUrlShareClick)}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) =>
          props.setSelectedRows(ids as string[])
        }
        pagination
        autoPageSize
      />
    </Paper>
  );
}

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface RowData {
  id: string;
  name: string | null;
  email: string | null;
  currentMoney: number;
  status: string;
  amount: number;
}

interface DataProps {
  data: RowData;
}

const CountButton: React.FC<DataProps> = ({ data }) => {
  return (
    <div>
      {data.status === "PENDING" ? (
        <span className="px-2 py-2 bg-purple-400 rounded ">{data.status}</span>
      ) : data.status === "DENY" ? (
        <span className="px-2 py-2 bg-rose-200 rounded ">{data.status}</span>
      ) : (
        <span className="px-2 py-2 bg-green-300 rounded ">{data.status}</span>
      )}
    </div>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 190,
  },
  {
    field: "currentMoney",
    headerName: "Current Money",
    type: "number",
    width: 110,
  },
  {
    field: "amount",
    headerName: "amount",
    type: "number",
    width: 110,
  },
  {
    field: "status",
    headerName: "Approve status",
    width: 180,
    renderCell: (params: GridCellParams<RowData, any>) => {
      //   const id = params.row.id;
      //   console.log({ params: params });

      return <CountButton data={params.row} />;
    },
  },
];

const RefundRequestClientTable: React.FC<{ rows: RowData[] }> = ({ rows }) => {
  return (
    <div className="pt-24 justify-center items-center px-28 mx-auto ">
      <span className="pt-6 text-blue-700 font-bold text-2xl ">
        Your Request Status:
      </span>
      <div className="pt-6">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default RefundRequestClientTable;

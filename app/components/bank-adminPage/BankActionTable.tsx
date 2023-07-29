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
  const [selectedOption, setSelectedOption] = React.useState<string>("PENDING");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = React.useCallback(
    (id: string) => {
      if (data.id === id) {
        //   console.log(`onclick number ${id}`);

        console.log(id);

        const data = {
          id: id,
          status: selectedOption,
        };

        axios
          .put("/api/applyMoney", data)
          .then(() => {
            toast.success("update the request");
            router.refresh();
            setSelectedOption("PENDING");
          })
          .catch((error) => {
            toast.error("something went wrong");
          })
          .finally(() => {});

        if (selectedOption) {
          console.log("Selected option:", selectedOption);
        }
      }
    },
    [data.id, router, selectedOption]
  );

  return (
    <div>
      {data.status === "PENDING" ? (
        <div className="flex justify-center items-center gap-3">
          <select
            className="font-bold px-2 py-2 bg-gray-200 rounded"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="DENY">DENY</option>
            <option value="APPROVE">APPROVE</option>
          </select>
          <div
            className={`${isLoading ? "disabled" : ""}`}
            onClick={() => handleClick(data.id)}
          >
            <BsFillCheckCircleFill
              fill="green"
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
      ) : data.status === "DENY" ? (
        <span className="px-2 py-2 bg-rose-200 rounded ">{data.status}</span>
      ) : (
        <span className="px-2 py-2 bg-green-300 rounded ">{data.status}</span>
      )}
    </div>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "currentMoney",
    headerName: "Current Money",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "amount",
    headerName: "amount",
    type: "number",
    width: 110,
    editable: true,
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

const BankActionTable: React.FC<{ rows: RowData[] }> = ({ rows }) => {
  return (
    <div className="pt-24">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default BankActionTable;

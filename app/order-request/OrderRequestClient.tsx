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
  userId: string;
  totalPrice: string;
  firstName: string;
  lastName: string;
  street: string;
  zip: string;
  mobile: string;
  status: string;
  createdAt: any;
}

interface DataProps {
  data: RowData[] | any;
}

const CountButton: React.FC<DataProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("PENDING");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = React.useCallback(
    (id: string, totalPrice: number) => {
      if (data.id === id) {
        //   console.log(`onclick number ${id}`);

        // console.log(id);

        const data = {
          id: id,
          status: selectedOption,
          totalPrice: totalPrice,
        };

        if (selectedOption === "PENDING") {
          toast.success("change successfully");
        } else {
          axios
            .put("/api/order-request", data)
            .then(() => {
              toast.success("update the request");
              router.refresh();
              setSelectedOption("PENDING");
            })
            .catch((error) => {
              console.log({ error: error });

              toast.error("something went wrong");
            })
            .finally(() => {});
        }

        if (selectedOption) {
          console.log("Selected option:", selectedOption);
        }
      }
    },
    [data.id, router, selectedOption]
  );

  console.log({ sdata: data });

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
            <option value="DECLINE">DECLINE</option>
            <option value="ACCEPT">ACCEPT</option>
          </select>
          <div
            className={`${isLoading ? "disabled" : ""}`}
            onClick={() => handleClick(data.id, data.totalPrice)}
          >
            <BsFillCheckCircleFill
              fill="green"
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
      ) : data.status === "DECLINE" ? (
        <span className="px-2 py-2 bg-rose-200 rounded ">{data.status}</span>
      ) : (
        <span className="px-2 py-2 bg-green-300 rounded ">
          {data.status || "ACCEPT"}
        </span>
      )}
    </div>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: " Order ID", width: 90 },
  {
    field: "userId",
    headerName: "UserId",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
  {
    field: "street",
    headerName: "Street",
    width: 100,
  },
  {
    field: "zip",
    headerName: "Zip",
    width: 100,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 100,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    type: "number",
    width: 110,
  },
  {
    field: "createdAt",
    headerName: "Date",
    type: "dateTime",
    width: 150,
  },
  {
    field: "status",
    headerName: "Approve status",
    width: 180,
    renderCell: (params: GridCellParams<RowData, any>) => {
      return <CountButton data={params.row} />;
    },
  },
];

const AcceptOrderTable: React.FC<{ rows: RowData[] | any }> = ({ rows }) => {
  return (
    <div className="pt-4">
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default AcceptOrderTable;

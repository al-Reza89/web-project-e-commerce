"use client";
import React, { useState } from "react";

import { alpha, styled } from "@mui/material/styles";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import getCurrentUser from "../actions/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import EmptyState from "../components/EmptyState";
import { Cart } from "@prisma/client";
import { useRouter } from "next/navigation";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[300],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "OrderId",
    width: 120,
    headerClassName: "custom-header",
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    width: 150,
    headerClassName: "custom-header",
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    headerClassName: "custom-header",
  },

  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    headerClassName: "custom-header",
  },
  {
    field: "street",
    headerName: "Street",
    width: 150,
    headerClassName: "custom-header",
  },

  {
    field: "mobile",
    headerName: "Mobile",
    width: 110,
    headerClassName: "custom-header",
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    type: "number",
    width: 110,
    headerClassName: "custom-header",
  },
  {
    field: "status",
    headerName: "Verify Perchage",
    width: 180,
    headerClassName: "custom-header",
  },
];

interface AllOrderClientTableProps {
  rows: Cart | any;
}

const AllOrderClientTable: React.FC<AllOrderClientTableProps> = ({ rows }) => {
  const router = useRouter();

  const handleRowSelected = (params: any) => {
    // console.log(params.id);
    router.push(`/checkout/${params.id}`);
  };

  return (
    <div
      style={{ height: 400, width: "100%" }}
      className="pt-24 max-w-full px-10  "
    >
      <span className="font-bold text-2xl text-indigo-700 ">
        List of your order:
      </span>
      <div className="pt-7">
        <StripedDataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          onRowClick={handleRowSelected}
        />
      </div>
    </div>
  );
};

export default AllOrderClientTable;

import React from "react";
import AcceptOrderTable from "./OrderRequestClient";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getAllOrderRequest from "../actions/getAllOrgerRequest";

const OrderRequest = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Sorry" subtitle="please login first" />;
  }

  const rows = await getAllOrderRequest();

  console.log({ rows: rows });

  return <AcceptOrderTable rows={rows} />;
};

export default OrderRequest;

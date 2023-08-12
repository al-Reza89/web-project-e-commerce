import React from "react";
import AcceptOrderTable from "./OrderRequestClient";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getAllOrderRequest from "../actions/getAllOrgerRequest";
import TotalAmount from "../components/order-request/TotalAmount";
import getTotalMoney from "../actions/getTotalMoney";

const OrderRequest = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Sorry" subtitle="please login first" />;
  }

  const rows = await getAllOrderRequest();
  const totalMoney = await getTotalMoney();

  // console.log({ rows: rows });
  console.log({ totalMoney: totalMoney });

  return (
    <div className="px-5 text-blue-700 font-extrabold text-3xl">
      <TotalAmount money={totalMoney?.money} />
      <AcceptOrderTable rows={rows} />
    </div>
  );
};

export default OrderRequest;

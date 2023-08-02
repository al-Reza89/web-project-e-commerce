import React from "react";
import AllOrderClientTable from "./AllOrderClient";
import getCurrentUser from "../actions/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import EmptyState from "../components/EmptyState";
import getAllOrderById from "../actions/getAllOrderById";

const AllOrderPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Sorry" subtitle="Login first" />;
  }

  const rows = await getAllOrderById(currentUser.id);

  return <AllOrderClientTable rows={rows} />;
};

export default AllOrderPage;

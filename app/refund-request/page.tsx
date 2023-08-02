import React from "react";
import RefundRequestClientTable from "./RefundRequestClientTable";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getBankRequestById from "../actions/getBantRequestById";

const RefundRequestpage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Sorry" subtitle="please login first" />;
  }

  const rows = await getBankRequestById(currentUser.id);

  return <RefundRequestClientTable rows={rows} />;
};

export default RefundRequestpage;

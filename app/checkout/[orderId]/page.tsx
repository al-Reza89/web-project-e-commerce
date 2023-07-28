import React from "react";
import OrderIdClient from "./OrderIdClient";
import getOrderIdDetails from "@/app/actions/getOrderIdDetails";
import EmptyState from "@/app/components/EmptyState";
import getBankInformation from "@/app/actions/getBankInformation";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  orderId?: string;
}

// ager niyome eita lekha jabe na
const OrderIdPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (params.orderId === undefined) {
    return (
      <EmptyState
        title="Sorry"
        subtitle="We do not have any product with this ID"
      />
    );
  }

  const orderIdDetails = await getOrderIdDetails(params.orderId);
  const bankInformation = await getBankInformation(currentUser?.id);

  return (
    <OrderIdClient
      orderIdDetails={orderIdDetails}
      currentUser={currentUser}
      currentMoney={bankInformation?.currentMoney}
    />
  );
};

export default OrderIdPage;

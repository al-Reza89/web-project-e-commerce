import React, { useEffect } from "react";
import OrderIdClient from "./OrderIdClient";
import getOrderIdDetails from "@/app/actions/getOrderIdDetails";
import EmptyState from "@/app/components/EmptyState";
import getBankInformation from "@/app/actions/getBankInformation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CartProducts from "@/app/store/CartProducts";

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

  if (!orderIdDetails) {
    return <EmptyState />;
  }

  // console.log({ orderIdDetails: orderIdDetails });

  return (
    <OrderIdClient
      orderIdDetails={orderIdDetails}
      image={currentUser?.image}
      name={currentUser?.name}
      email={currentUser?.email}
      userId={currentUser?.id}
      currentMoney={bankInformation?.currentMoney}
    />
  );
};

export default OrderIdPage;

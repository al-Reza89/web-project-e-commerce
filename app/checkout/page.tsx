import React from "react";
import Container from "../components/Container";
import ParentForm from "../components/CheckoutPage/ParentForm";
import getCurrentUser from "../actions/getCurrentUser";
import getBankInformation from "../actions/getBankInformation";

const Checkout = async () => {
  const currentUser = await getCurrentUser();
  const userId: string | undefined = currentUser?.id;

  const bankInformation = await getBankInformation(userId);

  return (
    <Container>
      <div className="pt-24  ">
        <ParentForm userId={userId} bankInformation={bankInformation} />
      </div>
    </Container>
  );
};

export default Checkout;

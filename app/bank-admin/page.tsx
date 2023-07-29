import React from "react";
import Container from "../components/Container";
import BankActionTable from "../components/bank-adminPage/BankActionTable";

const BankAdmin = async () => {
  return (
    <Container>
      <div className="pt-24">
        <BankActionTable />
      </div>
    </Container>
  );
};

export default BankAdmin;

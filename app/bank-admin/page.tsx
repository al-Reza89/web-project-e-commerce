import React from "react";
import Container from "../components/Container";
import BankActionTable from "../components/bank-adminPage/BankActionTable";
import getBankInformation from "../actions/getBankInformation";
import getAllBankInformation from "../actions/getAllBankInformation";

const BankAdmin = async () => {
  const rows = await getAllBankInformation();

  return (
    <Container>
      <div className="pt-24">
        <BankActionTable rows={rows} />
      </div>
    </Container>
  );
};

export default BankAdmin;

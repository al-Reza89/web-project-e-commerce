"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import useBankAccountModal from "@/app/hooks/useBankAccountModal";

interface BankAccoutModalProps {}

const BankAccountModal: React.FC<BankAccoutModalProps> = ({}) => {
  const bankModal = useBankAccountModal();

  return (
    <Modal
      isOpen={bankModal.isOpen}
      onClose={bankModal.onClose}
      onSubmit={() => {}}
      title="bank account"
    />
  );
};

export default BankAccountModal;

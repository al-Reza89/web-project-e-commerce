"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import useBankAccountModal from "@/app/hooks/useBankAccountModal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BankAccoutModalProps {}

const BankAccountModal: React.FC<BankAccoutModalProps> = ({}) => {
  const bankModal = useBankAccountModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/bank", data)
      .then(() => {
        toast.success("successfully create secret");
        router.refresh();
        reset();
        bankModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div>
      <Heading
        title="make it strong!!"
        subtitle="you have to memorise the bank sectet"
        center={false}
      />
      <Input
        id="secret"
        label="secret key"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={bankModal.isOpen}
      onClose={bankModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="bank account"
      body={bodyContent}
      actionLebel="create bank secret"
      disabled={isLoading}
      secondaryActionLabel=""
    />
  );
};

export default BankAccountModal;

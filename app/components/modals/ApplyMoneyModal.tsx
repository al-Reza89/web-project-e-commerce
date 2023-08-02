"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import useApplyMoneyModal from "@/app/hooks/useApplyMoneyModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../inputs/Input";
import axios from "axios";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import useBankAccountModal from "@/app/hooks/useBankAccountModal";
import { useRouter } from "next/navigation";

interface ApplyMoneyModalProps {
  bankSecret: string | undefined;
  userId: string | undefined;
  bankId: string | undefined;
}

const ApplyMoneyModal: React.FC<ApplyMoneyModalProps> = ({
  bankSecret,
  userId,
  bankId,
}) => {
  const applyMoneyModal = useApplyMoneyModal();
  const loginModal = useLoginModal();
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
      amount: 5000,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (userId === undefined) {
      toast.error("please login first");
      applyMoneyModal.onClose();
      loginModal.onOpen();
      setIsLoading(false);
    }

    if (bankId === undefined) {
      toast.error("please open bank first");
      applyMoneyModal.onClose();
      bankModal.onOpen();
      setIsLoading(false);
    }

    if (bankSecret !== data.secret) {
      toast.error("wrong secret try to remember");
      setIsLoading(false);
      return null;
    } else {
      const mergeData = {
        amount: data.amount,
        bankId: bankId,
        userId: userId,
      };

      console.log({ mergeData: mergeData });

      axios
        .post("/api/applyMoney", mergeData)
        .then((res) => {
          toast.success("Request has been sent it will take a while");
          router.refresh();
          reset();
          applyMoneyModal.onClose();
        })
        .catch((error) => {
          toast.error("something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });

      console.log(data);
    }
  };

  const bodyContent = (
    <div>
      <Heading title="Refund your account" subtitle="" center={false} />
      <div className="flex flex-col gap-2">
        <div>
          <Input
            id="secret"
            label="secret-key"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
        <div>
          <Input
            id="amount"
            label="how much you want to refund"
            formatPrice
            type="number"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={applyMoneyModal.isOpen}
      onClose={applyMoneyModal.onClose}
      title="Request for withdow money"
      body={bodyContent}
      actionLebel="apply for money"
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel=""
    />
  );
};

export default ApplyMoneyModal;

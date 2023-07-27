"use client";

import { useMultiStepForm } from "@/app/hooks/useMultiStepForm";
import React, { FormEvent, useState } from "react";
import CartDetails from "./CartDetails";
import UserInfoInput from "./UserInfoInput";
import SecretKey from "./Secretkey";
import CartProducts from "@/app/store/CartProducts";
import EmptyState from "../EmptyState";
import { Bank } from "@prisma/client";
import { toast } from "react-hot-toast";

interface ParentFormProps {
  userId: string | undefined;
  bankInformation: Bank | null;
}

type FormData = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: string;
  mobile: string;
  secretKey: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  street: ",",
  city: "",
  zip: "",
  mobile: "",
  secretKey: "",
};

const ParentForm: React.FC<ParentFormProps> = ({ userId, bankInformation }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const { products: cartProducts } = CartProducts();

  const totalPrice = cartProducts.reduce((accumulator, cartProduct) => {
    return accumulator + cartProduct.stock * cartProduct.price;
  }, 0);

  function updateFields(newData: Partial<FormData>) {
    setData((previousData) => {
      return { ...previousData, ...newData };
    });
  }

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return 1;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return 1;

      return i - 1;
    });
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    setCurrentStepIndex,
  } = useMultiStepForm([
    <CartDetails
      key="first"
      data={data}
      updateFields={updateFields}
      totalPrice={totalPrice}
    />,
    <UserInfoInput
      key="second"
      data={data}
      updateFields={updateFields}
      back={back}
    />,
    <SecretKey
      key="third"
      data={data}
      updateFields={updateFields}
      back={back}
    />,
  ]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (bankInformation === null) {
      toast.error("First Create Your Bank");
      return null;
    }

    if (bankInformation !== null) {
      if (bankInformation.currentMoney < totalPrice) {
        toast.error("Not enought bank Credit Apply for Credit");
        return null;
      }
    }

    if (!isLastStep) return next();

    console.log(data);
  }

  return (
    <div>
      {cartProducts.length === 0 ? (
        <EmptyState title="sorry" subtitle="Added product to your cart" />
      ) : (
        <form onSubmit={onSubmit}>
          <div>
            {currentStepIndex + 1}/{steps.length}
          </div>
          <div>{step}</div>
        </form>
      )}
    </div>
  );
};

export default ParentForm;

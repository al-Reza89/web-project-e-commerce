"use client";

import { useMultiStepForm } from "@/app/hooks/useMultiStepForm";
import React, { FormEvent, useState } from "react";
import CartDetails from "./CartDetails";
import UserInfoInput from "./UserInfoInput";
import SecretKey from "./Secretkey";
import CartProducts from "@/app/store/CartProducts";
import EmptyState from "../EmptyState";

interface ParentFormProps {}

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

const ParentForm: React.FC<ParentFormProps> = ({}) => {
  const [data, setData] = useState(INITIAL_DATA);
  const { products: cartProduct } = CartProducts();

  //   update the data or say store the data in state
  // partials means formdata er kisu thakteo pare na o pare
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

  //   multiplestep form array of react element expect kore amra surute dite pari ba pore o dite pari
  // and destructure the function from them and use it later
  // stpes hoilo sob react elements and step hoilo current stup ta
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    setCurrentStepIndex,
  } = useMultiStepForm([
    <CartDetails key="first" data={data} updateFields={updateFields} />,
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
    // eita na korle barbar form submit hoite thake like button er type na dileo ei kaj ta hoy
    e.preventDefault();
    if (!isLastStep) return next();

    console.log(data);
  }

  return (
    <div>
      {cartProduct.length === 0 ? (
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

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
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

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
  const { products: cartProducts, clearProduct } = CartProducts();
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);

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
      isLoading={isLoading}
    />,
  ]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userId) {
      toast.error("please login first");
      loginModal.onOpen();
      return null;
    }

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

    if (bankInformation.secret !== data.secretKey) {
      toast.error("invalid secret key");
      return null;
    }

    setIsLoading(true);

    const mergeData = {
      data: data,
      cartProducts: cartProducts,
      totalPrice: totalPrice,
    };

    axios
      .post("/api/cart", mergeData)
      .then((response) => {
        toast.success("place your order");
        router.refresh();
        setData(INITIAL_DATA);
        router.push(`/checkout/${response.data.id}`);
        clearProduct();
      })
      .catch((error) => {
        console.log({ error: error });
        toast.error("try again later");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

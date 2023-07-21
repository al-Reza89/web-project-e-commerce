"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import useAddProductModal from "@/app/hooks/useAddProductModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AddProductModalProps {}

const AddProductModal: React.FC<AddProductModalProps> = ({}) => {
  const productModal = useAddProductModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      details: "",
      imageSrc: "",
      price: 1000,
      stock: 1,
    },
  });

  const imageSrc = watch("imageSrc");

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    setIsLoading(true);

    axios
      .post("/api/product", data)
      .then(() => {
        toast.success("successfully added a product");
        router.refresh();
        reset();
        productModal.onClose();
      })
      .catch(() => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div>
      <Heading title="Add Your Product" subtitle="" center={false} />
      <div className="flex flex-col gap-2">
        <div>
          <Input
            id="title"
            label="product title"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
        <div>
          <Input
            id="details"
            label="product details"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
        <div>
          <Input
            id="price"
            label="price you offer"
            formatPrice
            type="number"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
        <div>
          <Input
            id="stock"
            label="How many stock"
            formatPrice
            type="number"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your product"
              subtitle=""
              center={false}
            />
            <ImageUpload
              value={imageSrc}
              onChange={(value) => setCustomeValue("imageSrc", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={productModal.isOpen}
      onClose={productModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Add Product To Store "
      actionLebel="create your product"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default AddProductModal;

/* eslint-disable @next/next/no-img-element */
"use client";
import EmptyState from "@/app/components/EmptyState";
import { Cart, CartItem, Product, User } from "@prisma/client";

import React from "react";

interface ProductDetails {
  id: string;
  imageSrc: string;
  title: string;
  details: string;
  price: number;
}

interface CartItems {
  id: string;
  quantity: number;
  product: ProductDetails;
}

interface OrderIdDetails {
  totalPrice: number;
  street: string;
  zip: string;
  id: string;
  createdAt: any;
  items: CartItems[];
}

interface OrderIdClientProps {
  orderIdDetails: OrderIdDetails | any;
  currentMoney: number | undefined;
  image: string | undefined | null;
  name: string | undefined | null;
  email: string | undefined | null;
  userId: string | undefined;
}

const OrderIdClient: React.FC<OrderIdClientProps> = ({
  orderIdDetails,
  currentMoney,
  image,
  name,
  email,
  userId,
}) => {
  if (userId === undefined) {
    return (
      <EmptyState title="sorry " subtitle="No order details with this ID" />
    );
  }
  // console.log(orderIdDetails);

  const handleDownloadPdf = () => {
    const element = document.getElementById("pdf-container"); // Replace "pdf-container" with the ID of the container that wraps the content you want to download as a PDF.

    if (!element) {
      console.error("Container not found.");
      return;
    }

    const opt = {
      margin: 0,
      filename: "receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
  };

  return (
    <div id="pdf-container" className="pt-12 max-w-5xl 2xl:max-w-6xl mx-auto ">
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
            Order #13432
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {/* {orderIdDetails.createdAt} */}
          </p>
        </div>
        <div className="mt-10 flex h-fit flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-100 shadow-xl  px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {orderIdDetails.items.map((item: any) => (
                <div
                  key={item.id}
                  className="mt-4  md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                >
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={item.product.imageSrc}
                      alt="dress"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {item.product.title}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-700">Details: </span>
                          {item.product.details}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-700">Size: </span> 65%
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        {item.product.price}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {item.quantity}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                        {item.quantity * item.product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 shadow-xl  space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ${orderIdDetails.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base pl-24 leading-4 text-gray-600">
                      -$00.00 (0%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">$0.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    ${orderIdDetails.totalPrice}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 shadow-xl  space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">
                    $0.00
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 shadow-xl  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {name}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                    {email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-4">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {orderIdDetails.street}
                      <br />
                      {orderIdDetails.zip}
                      {}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {orderIdDetails.street}
                      <br />
                      {orderIdDetails.zip}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-2 justify-center items-center md:justify-start md:items-start">
                  <button
                    onClick={() => {}}
                    className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                  >
                    Download Receive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderIdClient;

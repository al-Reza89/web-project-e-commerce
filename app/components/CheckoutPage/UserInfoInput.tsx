"use client";
import { useMultiStepForm } from "@/app/hooks/useMultiStepForm";
/* eslint-disable @next/next/no-img-element */

import React from "react";

type UserData = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: string;
  mobile: string;
};

interface UserInfoInputProps {
  data: UserData;
  updateFields: (newData: Partial<UserData>) => void;
  back: () => void;
}

const UserInfoInput: React.FC<UserInfoInputProps> = ({
  updateFields,
  data,
  back,
}) => {
  const { firstName, lastName, city, mobile, street, zip } = data;

  return (
    <div>
      <div className="w-full max-w-lg mx-auto shadow-2xl p-4 mt-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              value={firstName}
              onChange={(e) => updateFields({ firstName: e.target.value })}
              placeholder="Jane"
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => updateFields({ lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              STREET
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="12 baker street"
              value={street}
              onChange={(e) => updateFields({ street: e.target.value })}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you d like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Albuquerque"
              value={city}
              onChange={(e) => updateFields({ city: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
              value={zip}
              onChange={(e) => updateFields({ zip: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Mobile
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              value={mobile}
              onChange={(e) => updateFields({ mobile: e.target.value })}
              placeholder="012.."
            />
          </div>
        </div>
        <div className="flex justify-between pt-4 gap-2 ">
          <button
            onClick={back}
            className="bg-blue-400 w-[50%]  text-xl py-1 font-semibold "
          >
            Back
          </button>
          <button className="bg-blue-400 w-[50%]  text-xl py-1 font-semibold ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoInput;

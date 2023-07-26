"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";

type UserData = {
  secretKey: string;
};

interface SecretKeyProps {
  data: UserData;
  updateFields: (newData: Partial<UserData>) => void;
  back: () => void;
}

const SecretKey: React.FC<SecretKeyProps> = ({ updateFields, data, back }) => {
  const { secretKey } = data;

  return (
    <div className="max-w-xs mx-auto  bg-gray-100 shadow-2xl mt-12">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Bank Secret
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={secretKey}
            onChange={(e) => updateFields({ secretKey: e.target.value })}
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot secret?
          </a>
        </div>
        <div className="pt-4  w-full">
          <button
            onClick={back}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            back
          </button>
          <button className="bg-green-500 w-full p-1 text-lg font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretKey;

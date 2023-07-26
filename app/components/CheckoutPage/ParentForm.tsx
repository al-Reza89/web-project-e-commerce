"use client";

import { useMultiStepForm } from "@/app/hooks/useMultiStepForm";
import React, { FormEvent, useState } from "react";

interface ParentFormProps {}

type FormData = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: string;
  mobile: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  street: ",",
  city: "",
  zip: "",
  mobile: "",
};

const ParentForm: React.FC<ParentFormProps> = ({}) => {
  const [data, setData] = useState(INITIAL_DATA);

  //   update the data or say store the data in state
  // partials means formdata er kisu thakteo pare na o pare
  function updateFields(newData: Partial<FormData>) {
    setData((previousData) => {
      return { ...previousData, ...newData };
    });
  }

  //   multiplestep form array of react element expect kore amra surute dite pari ba pore o dite pari
  // and destructure the function from them and use it later
  // stpes hoilo sob react elements and step hoilo current stup ta
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <div key="first">one</div>,
      <div key="second">second</div>,
    ]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    // eita na korle barbar form submit hoite thake like button er type na dileo ei kaj ta hoy
    e.preventDefault();
    if (!isLastStep) return next();

    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {currentStepIndex + 1}/{steps.length}
        </div>
        <div>{step}</div>
        <div>
          {isFirstStep && (
            <button type="button" onClick={back}>
              backForm
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "NextForm"}</button>
        </div>
      </form>
    </div>
  );
};

export default ParentForm;

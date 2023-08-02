import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Loader from "./components/Loader";

const Loading = () => {
  return (
    <div className="pt-20  ">
      <Loader />
    </div>
  );
};

export default Loading;

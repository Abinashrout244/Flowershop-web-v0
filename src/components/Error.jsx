import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="flex flex-col gap-4 justify-center text-center items-center pt-[200px]">
      <h1 className="text-5xl font-semibold text-orange-400">
        {err.status}😒🔴
      </h1>
      <h3 className="text-lg font-semibold text-slate-700">{err.data}❌</h3>
    </div>
  );
};

export default Error;

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import UserForm from "@/app/components/HeadingForm/UserForm/UserForm";

const HeadingForm = () => {
  const [isViewHistory, setIsViewHistory] = useState(false);
  return (
    <div className="max-w-3xl w-full border-red-extra-dark border-4 rounded-xl mt-10 bg-fabric-medium">
      <div className="flex h-20 bg-red-extra-dark items-center w-full relative">
        <div
          className="w-full text-center text-white text-xl font-semibold cursor-pointer py-2"
          onClick={() => setIsViewHistory(false)}
        >
          Xem lá số
        </div>
        <div
          className="w-full text-center text-white text-xl font-semibold cursor-pointer py-2"
          onClick={() => setIsViewHistory(true)}
        >
          Lịch sử
        </div>
        <span
          className={cn(
            "absolute bg-fabric-medium top-0 w-1/2 h-full rounded-t-lg transition flex items-center justify-center",
            isViewHistory && "transform translate-x-full",
          )}
        >
          <p className="text-red-extra-dark font-semibold text-2xl">
            {isViewHistory ? "Lịch sử" : "Xem lá số"}
          </p>
        </span>
      </div>
      <div className="p-4">{!isViewHistory && <UserForm />}</div>
    </div>
  );
};

export default HeadingForm;

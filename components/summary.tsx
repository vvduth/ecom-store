"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Button from "./ui/Button";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);

  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
    } else if (searchParams.get("canceled")) {
      toast.error("Somwthign went wrong processing your payment");
    }
  }, [searchParams]);
  const onCheckout = async () => {
    const res = await axios.post(`${process.env.API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    window.location = res.data.url;
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return (
    <div className="mt-16 roudned-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4 ">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Order total:{" "}
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

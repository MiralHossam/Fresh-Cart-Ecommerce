"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // ✅ Added Zod import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkoutPayment } from "@/OrderAction/OrderAction";
import { useParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SchemaCheckout = z.object({
  details: z.string().nonempty("Details are required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^[0-9]{10,15}$/, "Phone must be valid"),
  city: z.string().nonempty("City is required"),
});

export default function Checkoutsession() {
  const { cartid } = useParams(); 

  const shippingForm = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function checkoutSessionPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    try {
      if (!cartid) {
        alert("Cart ID not found");
        return;
      }
      const data = await checkoutPayment(cartid as string, values);
      console.log(
        "Checkout values:",
        values,
        "CartId:",
        cartid,
        "Response:",
        data
      );

      if (!data?.session?.url) {
        alert("Payment failed. Please try again.");
        return;
      }

      window.open(data.session.url, "_self");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl font-bold mb-6">Checkout Payment</h1>

      <Form {...shippingForm}>
        <form
          className="space-y-4"
          onSubmit={shippingForm.handleSubmit(checkoutSessionPayment)}
        >
          {/* Details */}
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your City..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            type="submit"
          >
            Pay Now
          </Button>
        </form>
      </Form>
    </div>
  );
}

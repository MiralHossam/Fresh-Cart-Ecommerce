"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const Route = useRouter();

  const SchemaresetCode = z.object({
    resetCode: z
      .string()
      .nonempty("Reset Code is Required")
      .length(6, "Code must be 6 characters"),
  });

  const ResetForm = useForm<z.infer<typeof SchemaresetCode>>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(SchemaresetCode),
    mode: "onChange", 
  });

  async function handleresetCode(values: z.infer<typeof SchemaresetCode>) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.status === "Success") {
        Route.push("/resetPassword");
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      console.error("Reset code verification failed:", error);
      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5 text-center">
      <h1 className="text-2xl mb-6 my-5">Please Enter your Verification Code</h1>
      <Form {...ResetForm}>
        <form
          className="space-y-6"
          onSubmit={ResetForm.handleSubmit(handleresetCode)}
        >
          <FormField
            control={ResetForm.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-center mb-2">
                  Reset Code:
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      value={field.value}
                      onChange={field.onChange}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-12 h-14 text-xl border rounded-md mx-1"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-main text-white p-4
                       disabled:!bg-white disabled:!border disabled:!border-gray-400 
                       disabled:!text-gray-500 disabled:cursor-not-allowed"
            disabled={!ResetForm.formState.isValid || loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

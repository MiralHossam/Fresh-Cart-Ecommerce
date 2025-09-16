"use client";

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function ResetPassword() {
  const [btnLoading, setBtnLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const Route = useRouter()

  const SchemaResetPassword = z.object({
    email: z.string().email("Valid email is required"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain uppercase, lowercase, number & special character"
      ),
  })

  const ResetPasswordForm = useForm<z.infer<typeof SchemaResetPassword>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemaResetPassword),
    mode: "onChange", // ✅ live validation
  })

  async function handleResetPassword(values: z.infer<typeof SchemaResetPassword>) {
    setBtnLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = await res.json()
      console.log(data)

      if (data.token) {
        toast.success("Password reset successful!", { position: "top-center" })
        Route.push("/login")
      } else {
        toast.error(data.message ?? "Reset failed", { position: "top-center" })
      }
    } catch (error) {
      console.error("Reset password request failed:", error)
      toast.error("Something went wrong. Please try again later.", {
        position: "top-center",
      })
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-2xl mb-6 my-5">Reset your Account Password</h1>
      <Form {...ResetPasswordForm}>
        <form
          className="space-y-4"
          onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
        >
          {/* Email */}
          <FormField
            control={ResetPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={ResetPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showNewPassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-main text-white p-4
                       disabled:!bg-white disabled:!border disabled:!border-gray-300 
                       disabled:!text-gray-400 disabled:cursor-not-allowed"
            disabled={!ResetPasswordForm.formState.isValid || btnLoading}
          >
            {btnLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
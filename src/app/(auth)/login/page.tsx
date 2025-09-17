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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const SchemaLogin = z.object({
    email: z.string().nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must valid"
      ),
  });

  const LoginForm = useForm<z.infer<typeof SchemaLogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemaLogin),
    mode: "onChange",
  });

  async function handleLogin(values: z.infer<typeof SchemaLogin>) {
    setLoading(true);
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (data?.error) {
        toast.error("Invalid email or password!", { position: "top-center" });
      } else {
        toast.success("Login Success!", { position: "top-center" });

        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl mb-6 my-5">Login Now</h1>
      <Form {...LoginForm}>
        <form
          className="space-y-4"
          onSubmit={LoginForm.handleSubmit(handleLogin)}
        >
          {/* Email */}
          <FormField
            control={LoginForm.control}
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

          {/* Password */}
          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forget Password link */}
          <Link
            href="/ForgetPassword"
            className="block text-sm mb-4 text-main"
          >
            Forget your Password?
          </Link>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-main text-white p-4
              disabled:!bg-white disabled:!border disabled:!border-gray-400
              disabled:!text-gray-500 disabled:cursor-not-allowed"
            disabled={!LoginForm.formState.isValid || loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

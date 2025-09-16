"use client";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const Route = useRouter()

  const SchemaRegister = z.object({
    name: z.string().nonempty("Name is Required").min(2, "min char 2").max(15, "max char 15"),
    email: z.string().nonempty("Email is Required"),
    password: z.string()
      .nonempty("Password is Required")
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/, "Password must valid"),
    rePassword: z.string().nonempty("Confirm Password is Required"),
    phone: z.string()
      .nonempty("Phone is Required")
      .min(11, "min char 11")
      .regex(/^(\+2)?01[0125][0-9]{8}$/, "Phone must valid")
  }).refine((obj) => obj.password === obj.rePassword, {
    path: ['rePassword'],
    message: "Confirm Password Not Match",
  })

  const RegisterForm = useForm<z.infer<typeof SchemaRegister>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(SchemaRegister),
    mode: "onChange",
  })

  async function handleRegister(values: z.infer<typeof SchemaRegister>) {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)

      if (data.message === 'success') {
        toast.success("Account Created!", { position: 'top-center' })
        Route.push('/login')
      } else {
        toast.error(data.message, { position: 'top-center' })
      }
    } catch (error) {
      console.error("Register failed:", error)
      toast.error("Something went wrong!", { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-2xl mb-6 my-5">Register Now</h1>
      <Form {...RegisterForm}>
        <form className="space-y-4" onSubmit={RegisterForm.handleSubmit(handleRegister)}>
          {/* Name */}
          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={RegisterForm.control}
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
            control={RegisterForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showRePassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showRePassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone */}
          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            className="bg-main text-white p-6 
                       disabled:!bg-white disabled:!border disabled:!border-gray-400 
                       disabled:!text-gray-500 disabled:cursor-not-allowed"
            disabled={!RegisterForm.formState.isValid || loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              "Register Now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
'use client'

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

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false)
  const Route = useRouter()

  const SchemaForgetPassword = z.object({
    email: z.string().nonempty("Email is Required"),
  })

  const ForgetForm = useForm<z.infer<typeof SchemaForgetPassword>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(SchemaForgetPassword),
    mode: 'onChange', 
  })

  async function handleForgetPassword(values: z.infer<typeof SchemaForgetPassword>) {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      console.log(data)

      if (data.statusMsg === 'success') {
        Route.push('/resetCode')
      } else {
        toast.error(data.message, { position: 'top-center' })
      }
    } catch (error) {
      console.error('Forget password failed:', error)
      toast.error('Something went wrong!', { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl mb-6 my-5">Enter your Email</h1>
      <Form {...ForgetForm}>
        <form
          className="space-y-4"
          onSubmit={ForgetForm.handleSubmit(handleForgetPassword)}
        >
          <FormField
            control={ForgetForm.control}
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

          <Button
            type="submit"
            className="w-full bg-main text-white p-4
                       disabled:!bg-white disabled:!border disabled:!border-gray-400 
                       disabled:!text-gray-500 disabled:cursor-not-allowed"
            disabled={!ForgetForm.formState.isValid || loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}


"use client"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from 'next/link';






export default function LoginUser() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [isSubmitting, setIsSubmitting] = useState(false)


  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Login successful! Redirecting...")
      router.push('/dashboard')
    }
  }, [status, router])
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      identifier: '',
      password: ''
    },
  })

  // router.replace('/sign-up')

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true)
      const result = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: false,

      })
      if (result?.error) {
        console.log(result)
        toast(result?.error)
        setIsSubmitting(false)
      }

      if (result?.url) {
        console.log(result)
        setIsSubmitting(false)
        toast("Login Succefully")
        router.push('/dashboard')
      }

    } catch (error) {

      toast("login failed")
      setIsSubmitting(false)

    }
    // console.log(response)

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Login to your account
          </h1>
          <p className="mb-4">Enter Username or email to login</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or username" {...field} autoComplete="0" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (<> <Loader2 className="animate-spin" /> Please wait ...</>) : (' Submit')}</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not Registered yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
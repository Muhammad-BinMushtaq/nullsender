'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios'
import { signUpSchema } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"

const page = () => {
  const [username, setUsername] = useState('')
  const [userMessage, setuserMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const debounced = useDebounceCallback(setUsername, 2000)
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({

    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setuserMessage('')

        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setuserMessage(response.data.message)
          // console.log(response.data.message)

        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>
          setuserMessage(AxiosError.response?.data.message ?? "Error checking username")
          // console.log(AxiosError)

        }

        finally {
          setIsCheckingUsername(false)
        }
      }
    }

    checkUserNameUnique()
  }, [username])

  // onSubmit 
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)

    try {
      await axios.post<ApiResponse>('/api/sign-up', data)

      toast("Account created successfully"),

        router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    }


    catch (error) {
      const AxiosError = error as AxiosError<ApiResponse>
      let errorMessage = AxiosError.response?.data.message

      toast(errorMessage)

      setIsSubmitting(false)


    }

  }


  return (

    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join True Feedback
            </h1>
            <p className="mb-4">Sign up to start your anonymous adventure</p>
          </div>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">



              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>

                      <Input placeholder="username ..." autoComplete="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value)
                        }
                        } />


                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    {!isCheckingUsername && userMessage && (
                      <p
                        className={`text-sm ${userMessage === 'Username is availble'
                          ? 'text-green-500'
                          : 'text-red-500'
                          }`}
                      >
                        {userMessage}
                      </p>)}

                    <FormMessage />

                  </FormItem>



                )}
              />


              {/* email */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder="email ..." autoComplete="0"
                        {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>



                )}
              />

              {/* password */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password ..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>



                )}
              />

              {/* button */}


              <Button type="submit" disabled={isSubmitting}>
                <span className="flex items-center gap-2">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Please wait' : 'Signup'}
                </span>
              </Button>






            </form>

          </Form>

          <div className="text-center mt-4">
            <p>
              Already a member?{' '}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default page
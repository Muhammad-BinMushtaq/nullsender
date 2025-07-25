'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Toaster } from "sonner"
import axios, { AxiosError } from 'axios'
import * as z from 'zod';
import { verifySchema } from "@/schemas/verifySchema"
import { useParams, useRouter } from "next/navigation";
import { string } from "zod/v4";
import { ApiResponse } from "@/types/ApiResponse";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const verifyAccount = () => {

    const params = useParams<{ username: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        }

    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {

        try {

            const response = await axios.post('/api/verify-code', {
                username: params.username,
                verificationCode: data.code
            })
            console.log(data)

            toast(response.data.message)
            router.replace('/dashboard')
        } catch (error) {

            const AxiosError = error as AxiosError<ApiResponse>
            console.log(AxiosError)
            let errorMessage = AxiosError.response?.data.message

            toast(errorMessage)



        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Verify Your account
                        </h1>
                        <p className="mb-4">Enter OTP to verify your account</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter OTP" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter OTP that has sent to your email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                </div>
            </div>
        </>
    )
}

export default verifyAccount
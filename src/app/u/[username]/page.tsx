'use client'
import { messageSchema } from '@/schemas/messageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TypeOf } from 'zod/v4'
import { ApiResponse } from '@/types/ApiResponse'
import { Loader2 } from 'lucide-react'

const page = () => {
    const TemporayMessage = ["What’s a skill you’d love to master in the next year?", "If you could instantly teleport to any place for a day, where would you go?", "What’s a book, movie, or song that changed your perspective?"]


    const [sugegstMessages, setSuggestMessages] = useState(TemporayMessage)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const params = useParams()

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: ''

        }
    })

    const { setValue } = form

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        try {
            const response = await axios.post('/api/send-messages', {
                username: params.username,
                content: data.content,
            })
            // router.refresh()
            toast(response.data.message)
        } catch (error) {

            const axioserror = error as AxiosError
            console.log(axioserror)
            toast("Failed to send message")

        }
        finally { setValue("content", "") }
    }


    const onMessageSuggestionButton = async () => {
        setLoading(true)
        try {

            const response = await axios.post('/api/suggest-messages')

            console.log(response)
            const messages = response.data?.response
            setSuggestMessages(messages.split("||"))
            // console.log(sugegstMessages)

        } catch (error) {
            const axiosErrors = error as AxiosError
            console.log(axiosErrors)
        }
        finally {
            setLoading(false)
        }

    }



    const insertMessageIntoInputBox = (message: string) => {
        setValue("content", message)
    }

    return (
        <>
            <div className="w-full min-h-screen p-10 md:p-20 bg-gradient-to-br from-[#f2f0ff] to-[#f9f9fc]">
                <div className="mb-10">
                    <h2 className="text-4xl font-bold text-neutral-800">
                        Send anonymous message to{" "}
                        <span className="italic text-purple-600">'{params.username}'</span>
                    </h2>
                </div>

                <div className="backdrop-blur-md bg-white/50 border border-white/30 shadow-xl rounded-2xl p-6 md:p-10 transition-all duration-300">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 md:space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-neutral-700 text-sm font-medium">
                                            Message
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-white/40 border border-purple-200 text-neutral-800 placeholder:text-neutral-500 focus:ring-2 focus:ring-purple-400 rounded-xl px-4 py-2 backdrop-blur"
                                                placeholder="Enter your message here..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 font-medium shadow-md transition duration-200"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="mt-10">
                    {loading ? (
                        <Loader2 className="animate-spin text-purple-500 w-6 h-6 mx-auto" />
                    ) : (
                        <div className="flex flex-wrap gap-3 mt-4">
                            {sugegstMessages.map((message) => (
                                <button
                                    key={Math.random()}
                                    onClick={() => {
                                        insertMessageIntoInputBox(message);
                                    }}
                                    className="px-4 py-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium transition-all shadow-sm"
                                >
                                    {message}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Button
                    onClick={onMessageSuggestionButton}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-2 shadow-md"
                >
                    regenerate Messages
                </Button>
            </div>
        </>
    );


}

export default page
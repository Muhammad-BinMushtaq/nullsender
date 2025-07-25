'use client'

import MessageCard from '@/components/message'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message } from '@/models/user'
import { AcceptMessageSchema } from '@/schemas/accceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { set } from 'mongoose'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"
import * as z from 'zod'



const UserDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(false)
  const router = useRouter()


  const handleDeleteMessages = async (messageId: string) => {

    setMessages(messages.filter((message) => message._id !== messageId))

    await axios.delete<ApiResponse>(`/api/delete-message/${messageId}`)


  }

  const { data: session, status, update } = useSession()




  const form = useForm<z.infer<typeof AcceptMessageSchema>>({
    resolver: zodResolver(AcceptMessageSchema),

  });


  const { register, watch, setValue } = form

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)


    try {
      const response = await axios.get('/api/accept-messages')
      setValue("acceptMessages", response.data.isAcceptingMessage)
      // toast(response.data.message)
      console.log(response.data)
      // console.log(acceptMessages)


    } catch (error) {
      const axioserrors = error as AxiosError
      console.log(axioserrors)
      // toast(axioserrors?.response?.data.message)
    }

    finally {
      setIsSwitchLoading(false)
    }


  }, [setValue, session])

  const fetchAllMessages = useCallback(async (refresh: boolean) => {
    try {

      setIsLoading(true)
      setIsSwitchLoading(false)

      const response = await axios.get<ApiResponse>('/api/get-messages')
      if (!response.data.success) {
        toast(response.data.message || "some thing went wrong |")
      }
      setMessages(response.data.messages || [])
      console.log(response.data.message)
      if (refresh) {
        toast("Showing refresh messages")
      }

    } catch (error) {
      const axiosErrors = error as AxiosError
      console.log(axiosErrors?.response?.data)

    }

    finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }

  }, [session])



  useEffect(() => {


    if (status === "authenticated") {
      fetchAcceptMessages()
      fetchAllMessages(false)
    }
    // else if (status === 'unauthenticated') {
    //   router.replace('/sign-in')


    // }
  }

    , [status, session, setValue, fetchAllMessages])


  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
        <Loader2 className="h-14 w-14 animate-spin text-zinc-600" />
      </div>

    )
  }



  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptingMessage: !acceptMessages
      })

      setValue('acceptMessages', !acceptMessages);
      toast(`${!acceptMessages ? '✅ You are now accepting messages.' : '🚫 You are no longer accepting messages.'}`);
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(axiosError.response)
      // toast(axiosError.response?.data?.message)
    }
  }



  // const { username } = session?.user as User;
  const username = session?.user?.username
  const email = session?.user?.email

  // const baseUrl = `${window.location.protocol}//${window.location.host}`
  // const profileUrl = `${baseUrl}/u/${username}`

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const profileUrl = `${baseUrl}/u/${session?.user?.username || ''}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast('Profile URL has been copied to clipboard.',);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-purple-300/20 blur-xl -z-10 animate-float"></div>
      <div className="fixed bottom-32 right-16 w-48 h-48 rounded-full bg-indigo-300/15 blur-xl -z-10 animate-float-delay"></div>

      <div className="w-full max-w-7xl mx-auto relative">
        {/* Main Header */}
        <div className="text-center mb-12 sm:mb-16 relative group px-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            <span className="relative inline-block">
              <span className="absolute -inset-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg transform rotate-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative">{username}'s</span>
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Dashboard
            </span>
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-500 max-w-2xl mx-auto">
            Your <span className="text-purple-600 font-semibold">personalized</span> message center
            with <span className="text-indigo-600 font-semibold">premium</span> experience
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/80 overflow-hidden relative">
          <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-white via-purple-100 to-indigo-100 -z-10"></div>

          {/* Link Section */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-gray-200/60 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 p-2 rounded-lg">🔗</span>
              Your Unique Link
            </h2>
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="w-full p-4 rounded-full border border-gray-200/80 bg-gray-50/50 text-gray-700 text-lg font-medium outline-none focus:ring-2 focus:ring-purple-300/80 focus:border-transparent transition-all shadow-inner"
              />
              <Button
                onClick={copyToClipboard}
                className="w-full lg:w-auto relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">Copy</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>

          {/* Message Toggle */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-gray-200/60">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg">✉️</span>
                  Accept Messages
                </h3>
                <p className="text-base text-gray-500/90">
                  {acceptMessages ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Currently accepting new messages
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Not accepting messages
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-bold ${acceptMessages ? 'text-green-600' : 'text-amber-600'}`}>
                  {acceptMessages ? 'ACTIVE' : 'PAUSED'}
                </span>
                <Switch
                  {...register('acceptMessages')}
                  checked={acceptMessages ?? false}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="scale-110 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-800 p-2 rounded-lg">💬</span>
                  Messages
                </h3>
                <p className="text-base sm:text-lg font-medium text-gray-500/90">
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'} received
                  {messages.length > 0 && (
                    <span className="ml-2 text-purple-600 font-semibold animate-pulse">
                      · New
                    </span>
                  )}
                </p>
              </div>
              <Button
                className="w-14 h-14 rounded-full border-0 bg-gradient-to-br from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                variant="outline"
                onClick={() => fetchAllMessages(false)}
              >
                {isLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin text-purple-600" />
                ) : (
                  <RefreshCcw className="h-7 w-7 transition-transform duration-500 group-hover:rotate-180" />
                )}
              </Button>
            </div>

            {/* Message Grid */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/80">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-300/70 border-dashed animate-spin-slow"></div>
                </div>
                <p>Loading ...</p>
              </div>
            ) : messages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    onMessageDelete={handleDeleteMessages}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/80">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-300/70 border-dashed animate-spin-slow"></div>
                </div>
                <p className="text-2xl font-bold text-gray-400/90 mb-2">No messages yet</p>
                <p className="text-lg font-medium text-gray-300/80">
                  Share your link to start receiving{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    beautiful messages
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );







}
export default UserDashboard
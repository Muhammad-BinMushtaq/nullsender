'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import messages from '../../../src/message.json'
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import '../../../public/dashboard.png'




const page = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleButtonClick = async () => {

    if (status === 'unauthenticated') {
      router.replace('/sign-in')
    }

    if (status === "authenticated") {
      router.replace('/dashboard')
    }
  }


  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-12 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50">
        {/* Hero Section */}
        <section className="text-center mb-12 max-w-4xl w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-4 md:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Get Honest Feedback
            </span>
            <br />
            Without Revealing Who You Are
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 mb-8 md:mb-10">
            Speak your mind. Stay anonymous. Get clarity.
          </p>

          {/* Button */}
          <Button onClick={handleButtonClick} className="cursor-pointer relative group overflow-hidden px-6 py-3 md:px-8 md:py-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-[1.03] active:scale-95">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 group-hover:from-purple-700 group-hover:to-indigo-700 transition-all duration-500"></div>

            {/* Floating orb decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-indigo-400/20 rounded-full blur-lg opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-purple-400/50 via-indigo-400/50 to-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-500"></div>
            </div>

            {/* Button content */}
            <div className="relative flex items-center justify-center gap-2 md:gap-3">
              <span className="text-base md:text-lg text-white font-semi-bold">Get Started</span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>

            {/* Ripple effect (add JS handler for click) */}
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-active:opacity-100 group-active:animate-ripple transition-opacity duration-300"></span>
          </Button>

          {/* Messages Carousel */}
          <div className="w-full max-w-4xl mt-16 md:mt-20">
            <Carousel
              plugins={[Autoplay({ delay: 3000 })]}
              className="relative group"
            >
              {/* Floating orb decorations */}
              <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/15 rounded-full blur-3xl -z-10 animate-float"></div>

              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="p-2 sm:p-4 md:p-6">
                    <Card className="group relative w-full bg-white rounded-2xl shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-purple-400 to-indigo-400 -z-10">
                        <div className="w-full h-full bg-white rounded-[calc(1rem-1px)]"></div>
                      </div>

                      {/* Floating Orbs */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-indigo-300/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-200/15 to-indigo-200/10 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                      <CardHeader className="relative z-10 p-4 md:p-6 pb-2 md:pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                            <CardTitle className="text-lg md:text-xl font-black text-gray-900">
                              {message.title}
                              <span className="block text-xs font-bold text-purple-600 mt-1 tracking-wider uppercase">
                                Anonymous Message
                              </span>
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative z-10 px-4 md:px-6 pb-4 md:pb-6 pt-0">
                        <CardDescription className="text-gray-700 font-medium relative text-sm sm:text-base">
                          <span className="text-4xl md:text-5xl font-black text-purple-200/40 absolute -top-3 sm:-top-4 -left-1 sm:-left-2 leading-none select-none">"</span>
                          <span className="relative z-10 pl-4 sm:pl-6 pr-2 block">
                            {message.content}
                          </span>
                          <span className="text-4xl md:text-5xl font-black text-purple-200/40 absolute -bottom-4 sm:-bottom-6 -right-1 sm:-right-2 leading-none select-none rotate-180">"</span>
                        </CardDescription>
                      </CardContent>

                      <CardFooter className="relative z-10 px-4 md:px-6 pb-4 md:pb-6 pt-0">
                        <div className="flex items-center justify-between w-full pt-4 border-t border-gray-200/50">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              {['from-purple-400 to-purple-500', 'from-indigo-400 to-indigo-500', 'from-purple-400 to-indigo-400'].map((gradient, i) => (
                                <div
                                  key={gradient}
                                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`}
                                  style={{ animationDelay: `${i * 0.2}s` }}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-gray-500 tracking-wider">
                              ANONYMOUS SENDER
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow"></div>
                              <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
                            </div>
                            <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Verified</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-all shadow-md" />
              <CarouselNext className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-all shadow-md" />
            </Carousel>
          </div>


          {/* Dashboard Preview Section */}
          <section className="mt-20 w-full max-w-5xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Previous Dashboard Preview
            </h2>

            {/* Subheading (optional) */}
            <p className="text-3xl sm:text-1xl text-gray-700 mb-8 font-bold">
              Here’s a glimpse of what your dashboard look like.
            </p>

            {/* Image */}
            <div className="w-full">
              <img
                src="/dashboard.png" // Make sure the image is in the `public` folder
                alt="Dashboard preview"
                className="w-full rounded-md md:rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </section>


          {/* Workflow Visualization */}
          <h1 className="text-start w-full mt-12 md:mt-16 text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-8 md:mb-10">
            How it works
          </h1>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200/60 mb-12">
            <div className="flex flex-col items-center">
              {[
                { text: "You share your link", icon: "🔗" },
                { text: "Anyone can send you a message anonymously", icon: "✉️" },
                { text: "You receive honest feedback no names, just truth", icon: "👁️" },
                { text: "You read it in a clean, beautiful space", icon: "✨" }
              ].map((item, index) => (
                <React.Fragment key={index}>
                  {/* Step Container */}
                  <div className="flex items-center w-full gap-4 md:gap-6 relative">

                    {/* Icon Container */}
                    <div className=" w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 shadow-inner border border-white flex items-center justify-center ml-4 md:ml-5">
                      <span className="text-md">{item.icon}</span>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 py-4 border-b border-gray-200/50">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                        {item.text}
                      </h3>
                    </div>
                  </div>


                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
            {[
              "A private link to collect messages",
              "100% anonymous sender experience",
              "No login or app needed",
              "Real, honest insights from anyone",
              "Beautiful, calming interface",
              "You stay in control — read or delete"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200/50">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700 font-medium text-sm sm:text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-4 sm:p-6 mt-12 w-full bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-600">
              © {new Date().getFullYear()} True Feedback. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(2deg); }
    }
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
  `}</style>
    </>
  )



}

export default page
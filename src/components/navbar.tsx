'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { User } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const user: User = session?.user


    return (
        <nav className="p-4 md:p-6 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white border-b border-gray-700/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex md:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <a
                    href="#"
                    className="text-2xl font-bold hover:text-purple-300 transition-colors"
                >
                    <span className="text-white/90">Null</span>
                    <span className="text-purple-400">Messages</span>
                </a>

                {/* Auth Section */}
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                    {status === "authenticated" ? (
                        <>
                            <span className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-colors">
                                Welcome, {user?.username || user?.email}
                            </span>
                            <Button
                                onClick={() => { signOut() }}
                                className="w-full md:w-auto bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border border-gray-600 shadow-md hover:shadow-lg transition-all"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className="w-full md:w-auto bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar
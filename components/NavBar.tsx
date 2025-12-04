"use client";

import Link from "next/link";

import { useClerk, useUser } from "@clerk/nextjs";
import { CreditCard, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { user } = useUser();
    const { signOut } = useClerk();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-purple-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-purple-800/50 dark:bg-gray-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="group flex shrink-0 items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 transition-all group-hover:scale-110 group-hover:shadow-lg">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
                                TodoMaster
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-10 w-10 rounded-full transition-all hover:scale-110 hover:ring-2 hover:ring-purple-500/50"
                                        >
                                            <Avatar className="h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-800">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt="User avatar"
                                                />
                                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 font-semibold text-white">
                                                    {user.firstName?.charAt(0) ||
                                                        user.emailAddresses[0]?.emailAddress
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                        "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56 border-purple-200 dark:border-purple-800"
                                    >
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {user.firstName ||
                                                    user.emailAddresses[0]?.emailAddress}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {user.emailAddresses[0]?.emailAddress}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/subscribe"
                                                className="flex cursor-pointer items-center text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                            >
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                <span>Subscription</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => signOut()}
                                            className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="hidden text-gray-700 hover:text-purple-600 sm:inline-flex dark:text-gray-300 dark:hover:text-purple-400"
                                >
                                    <Link href="/sign-in">Sign In</Link>
                                </Button>
                                <Button
                                    variant="default"
                                    asChild
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 hover:shadow-purple-500/40"
                                >
                                    <Link href="/sign-up">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

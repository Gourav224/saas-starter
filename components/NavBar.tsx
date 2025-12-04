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
        <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="group flex shrink-0 items-center gap-2">
                            <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
                                <Sparkles className="text-primary h-5 w-5" />
                            </div>
                            <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                TodoMaster
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-accent relative h-10 w-10 rounded-full transition-colors"
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt="User avatar"
                                                />
                                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                    {user.firstName?.charAt(0) ||
                                                        user.emailAddresses[0]?.emailAddress
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                        "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium">
                                                {user.firstName ||
                                                    user.emailAddresses[0]?.emailAddress}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {user.emailAddresses[0]?.emailAddress}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/subscribe"
                                                className="flex cursor-pointer items-center"
                                            >
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                <span>Subscription</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => signOut()}
                                            className="text-destructive focus:text-destructive cursor-pointer"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                                    <Link href="/sign-in">Sign In</Link>
                                </Button>
                                <Button variant="default" asChild>
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

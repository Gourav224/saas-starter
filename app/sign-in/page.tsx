/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    if (!isLoaded) {
        return null;
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            } else {
                console.error(JSON.stringify(result, null, 2));
            }
        } catch (err: any) {
            console.error("error", err.errors[0].message);
            setError(err.errors[0].message);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <Card className="w-full max-w-md border-2 border-purple-200 shadow-2xl backdrop-blur-sm dark:border-purple-800">
                <CardHeader className="space-y-2 pb-6 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                        <span className="text-2xl">✨</span>
                    </div>
                    <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                        Welcome back
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to continue to TodoMaster
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder="you@example.com"
                                className="h-11 border-purple-200 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-800"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-11 border-purple-200 pr-10 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-800"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="border-2">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            className="h-11 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-purple-500/40"
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-purple-600 hover:underline dark:text-purple-400"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

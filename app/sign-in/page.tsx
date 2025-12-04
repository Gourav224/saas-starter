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
        <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
            <Card className="w-full max-w-md border-2 shadow-xl">
                <CardHeader className="space-y-2 pb-6 text-center">
                    <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <span className="text-2xl">✨</span>
                    </div>
                    <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                    <p className="text-muted-foreground">Sign in to continue to TodoMaster</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder="you@example.com"
                                className="h-11"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-11 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
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
                        <Button type="submit" className="h-11 w-full text-base font-semibold">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pt-4">
                    <p className="text-muted-foreground text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-primary font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

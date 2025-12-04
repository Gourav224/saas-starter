/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSignUp } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setPendingVerification(true);
            setError("");
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors[0].message);
        }
    }

    async function onPressVerify(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors[0].message);
        }
    }

    return (
        <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
            <Card className="w-full max-w-md border-2 shadow-xl">
                <CardHeader className="space-y-2 pb-6 text-center">
                    <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <CardTitle className="text-3xl font-bold">
                        {!pendingVerification ? "Create your account" : "Verify your email"}
                    </CardTitle>
                    <p className="text-muted-foreground">
                        {!pendingVerification
                            ? "Get started with TodoMaster today"
                            : "We sent a verification code to your email"}
                    </p>
                </CardHeader>
                <CardContent>
                    {!pendingVerification ? (
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
                                        placeholder="Create a strong password"
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
                                Sign Up
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={onPressVerify} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-sm font-medium">
                                    Verification Code
                                </Label>
                                <Input
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    className="h-11 text-center text-lg tracking-widest"
                                    maxLength={6}
                                    required
                                />
                                <p className="text-muted-foreground text-xs">
                                    Check your email for the verification code
                                </p>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="border-2">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="h-11 w-full text-base font-semibold">
                                Verify Email
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="justify-center pt-4">
                    <p className="text-muted-foreground text-sm">
                        {!pendingVerification ? (
                            <>
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Sign in
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="text-primary font-semibold hover:underline"
                            >
                                Back to sign in
                            </Link>
                        )}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;

import Link from "next/link";

import { CheckCircle, Shield, Sparkles, Zap } from "lucide-react";

import Navbar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="mx-auto max-w-4xl space-y-8 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/25">
                            <Sparkles className="h-4 w-4" />
                            <span>Your Productivity Companion</span>
                        </div>
                        <h1 className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                            TodoMaster
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">
                            Organize your life, one task at a time. Simple, powerful, and beautiful
                            task management for the modern world.
                        </p>
                        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                            <Button
                                size="lg"
                                asChild
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-lg text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/40"
                            >
                                <Link href="/sign-up">Get Started Free</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="border-2 border-purple-200 px-8 text-lg text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950"
                            >
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold">Everything you need</h2>
                            <p className="text-muted-foreground text-xl">
                                Powerful features to help you stay organized
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl">
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-gray-900 dark:text-gray-100">
                                        Lightning Fast
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Create and manage your todos in seconds. No clutter, no
                                        complexity.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-gray-900 dark:text-gray-100">
                                        Secure & Private
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Your data is encrypted and secure. We never share your
                                        information.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl">
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-gray-900 dark:text-gray-100">
                                        Beautiful Design
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Enjoy a clean, modern interface that makes task management
                                        enjoyable.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="mx-auto max-w-4xl">
                        <Card className="border-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 shadow-2xl shadow-purple-500/30">
                            <CardContent className="p-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                    Ready to get organized?
                                </h2>
                                <p className="mb-8 text-lg text-purple-100">
                                    Join thousands of users who are already managing their tasks
                                    with TodoMaster.
                                </p>
                                <Button
                                    size="lg"
                                    asChild
                                    className="bg-white px-8 text-lg font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 hover:bg-purple-50"
                                >
                                    <Link href="/sign-up">Start Free Today</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </>
    );
}

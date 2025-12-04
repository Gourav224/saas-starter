"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AlertTriangle, CheckCircle } from "lucide-react";

import { BackButton } from "@/components/BackButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SubscribePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubscriptionStatus = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/subscription");
            if (response.ok) {
                const data = await response.json();
                setIsSubscribed(data.isSubscribed);
                setSubscriptionEnds(data.subscriptionEnds);
            } else {
                throw new Error("Failed to fetch subscription status");
            }
        } catch (error) {
            console.error("Error fetching subscription status:", error);
            // Display a toast notification for the error
            toast({
                title: "Error",
                description: "Failed to fetch subscription status. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubscribe = async () => {
        try {
            const response = await fetch("/api/subscription", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setIsSubscribed(true);
                setSubscriptionEnds(data.subscriptionEnds);
                router.refresh();
                toast({
                    title: "Success",
                    description: "You have successfully subscribed!",
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to subscribe");
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while subscribing. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <BackButton />
                <div className="mt-8 mb-12 text-center">
                    <h1 className="mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Subscription
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Unlock unlimited todos and premium features
                    </p>
                </div>
                <Card className="border-2 border-purple-200 bg-white/90 shadow-2xl backdrop-blur-sm dark:border-purple-800 dark:bg-gray-900/90">
                    <CardHeader className="pb-6">
                        <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl text-transparent">
                            Your Subscription Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isSubscribed ? (
                            <Alert className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <AlertDescription className="text-base text-gray-800 dark:text-gray-200">
                                    <div className="mb-1 font-semibold text-green-700 dark:text-green-300">
                                        You&apos;re subscribed! 🎉
                                    </div>
                                    Your subscription ends on{" "}
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {new Date(subscriptionEnds!).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <Alert variant="destructive" className="border-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    <AlertDescription className="text-base">
                                        You are not currently subscribed. Subscribe now to unlock
                                        all features!
                                    </AlertDescription>
                                </Alert>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            Premium Features:
                                        </h3>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                Unlimited todos
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                Priority support
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                Advanced features
                                            </li>
                                        </ul>
                                    </div>
                                    <Button
                                        onClick={handleSubscribe}
                                        className="h-12 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-purple-500/40"
                                        size="lg"
                                    >
                                        Subscribe Now
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

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
        <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <BackButton />
                <div className="mt-8 mb-12 text-center">
                    <h1 className="from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Subscription
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Unlock unlimited todos and premium features
                    </p>
                </div>
                <Card className="border-2 shadow-xl">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl">Your Subscription Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isSubscribed ? (
                            <Alert className="border-primary/20 bg-primary/5 border-2">
                                <CheckCircle className="text-primary h-5 w-5" />
                                <AlertDescription className="text-base">
                                    <div className="mb-1 font-semibold">
                                        You&apos;re subscribed! 🎉
                                    </div>
                                    Your subscription ends on{" "}
                                    <span className="font-medium">
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
                                        <h3 className="text-lg font-semibold">Premium Features:</h3>
                                        <ul className="text-muted-foreground space-y-2">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="text-primary h-4 w-4" />
                                                Unlimited todos
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="text-primary h-4 w-4" />
                                                Priority support
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="text-primary h-4 w-4" />
                                                Advanced features
                                            </li>
                                        </ul>
                                    </div>
                                    <Button
                                        onClick={handleSubscribe}
                                        className="h-12 w-full text-base font-semibold"
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

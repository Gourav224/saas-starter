"use client";

import { useEffect, useState } from "react";

import { Todo, User } from "@prisma/client";
import { useDebounceValue } from "usehooks-ts";

import { Pagination } from "@/components/Pagination";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface UserWithTodos extends User {
    todos: Todo[];
}

export default function AdminDashboard() {
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useDebounceValue("", 300);
    const [user, setUser] = useState<UserWithTodos | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUserData = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/admin?email=${debouncedEmail}&page=${page}`);
            if (!response.ok) throw new Error("Failed to fetch user data");
            const data = await response.json();
            setUser(data.user);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            toast({
                title: "Success",
                description: "User data fetched successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch user data. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedEmail) {
            fetchUserData(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedEmail]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setDebouncedEmail(email);
    };

    const handleUpdateSubscription = async () => {
        toast({
            title: "Updating Subscription",
            description: "Please wait...",
        });
        try {
            const response = await fetch("/api/admin", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: debouncedEmail,
                    isSubscribed: !user?.isSubscribed,
                }),
            });
            if (!response.ok) throw new Error("Failed to update subscription");
            fetchUserData(currentPage);
            toast({
                title: "Success",
                description: "Subscription updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update subscription. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleUpdateTodo = async (id: string, completed: boolean) => {
        toast({
            title: "Updating Todo",
            description: "Please wait...",
        });
        try {
            const response = await fetch("/api/admin", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: debouncedEmail,
                    todoId: id,
                    todoCompleted: completed,
                }),
            });
            if (!response.ok) throw new Error("Failed to update todo");
            fetchUserData(currentPage);
            toast({
                title: "Success",
                description: "Todo updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update todo. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteTodo = async (id: string) => {
        toast({
            title: "Deleting Todo",
            description: "Please wait...",
        });
        try {
            const response = await fetch("/api/admin", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ todoId: id }),
            });
            if (!response.ok) throw new Error("Failed to delete todo");
            fetchUserData(currentPage);
            toast({
                title: "Success",
                description: "Todo deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete todo. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="mb-8">
                    <h1 className="from-foreground to-foreground/70 mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">Manage users and their subscriptions</p>
                </div>

                <Card className="mb-6 border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Search User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter user email"
                                className="h-11"
                                required
                            />
                            <Button type="submit" className="h-11 px-6">
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {isLoading ? (
                    <Card className="border-2">
                        <CardContent className="py-12 text-center">
                            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                            <p className="text-muted-foreground">Loading user data...</p>
                        </CardContent>
                    </Card>
                ) : user ? (
                    <>
                        <Card className="mb-6 border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl">User Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-muted-foreground text-sm">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-muted-foreground text-sm">
                                        Subscription Status
                                    </p>
                                    <p className="font-medium">
                                        {user.isSubscribed ? (
                                            <span className="text-primary">Subscribed</span>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Not Subscribed
                                            </span>
                                        )}
                                    </p>
                                </div>
                                {user.subscriptionEnds && (
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm">
                                            Subscription Ends
                                        </p>
                                        <p className="font-medium">
                                            {new Date(user.subscriptionEnds).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                },
                                            )}
                                        </p>
                                    </div>
                                )}
                                <Button
                                    onClick={handleUpdateSubscription}
                                    variant={user.isSubscribed ? "destructive" : "default"}
                                    className="mt-4"
                                >
                                    {user.isSubscribed ? "Cancel Subscription" : "Subscribe User"}
                                </Button>
                            </CardContent>
                        </Card>

                        {user.todos.length > 0 ? (
                            <Card className="border-2 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        User Todos ({user.todos.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {user.todos.map((todo) => (
                                            <TodoItem
                                                key={todo.id}
                                                todo={todo}
                                                isAdmin={true}
                                                onUpdate={handleUpdateTodo}
                                                onDelete={handleDeleteTodo}
                                            />
                                        ))}
                                    </ul>
                                    {totalPages > 1 && (
                                        <div className="mt-6">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={(page) => fetchUserData(page)}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border-2">
                                <CardContent className="py-12 text-center">
                                    <p className="text-muted-foreground">This user has no todos.</p>
                                </CardContent>
                            </Card>
                        )}
                    </>
                ) : debouncedEmail ? (
                    <Card className="border-2">
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No user found with this email.</p>
                        </CardContent>
                    </Card>
                ) : null}
            </div>
        </div>
    );
}

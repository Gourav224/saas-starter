"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { Todo } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

import { Pagination } from "@/components/Pagination";
import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
    const { user } = useUser();
    const { toast } = useToast();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

    const fetchTodos = async (page: number) => {
        try {
            const response = await fetch(`/api/todos?page=${page}&search=${debouncedSearchTerm}`);
            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            const data = await response.json();
            setTodos(data.todos);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setIsLoading(false);
            toast({
                title: "Success",
                description: "Todos fetched successfully.",
            });
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "Failed to fetch todos. Please try again.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchTodos(1);
        fetchSubscriptionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    const fetchSubscriptionStatus = async () => {
        const response = await fetch("/api/subscription");
        if (response.ok) {
            const data = await response.json();
            setIsSubscribed(data.isSubscribed);
        }
    };

    const handleAddTodo = async (title: string) => {
        toast({
            title: "Adding Todo",
            description: "Please wait...",
        });
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error("Failed to add todo");
            }
            await fetchTodos(currentPage);
            toast({
                title: "Success",
                description: "Todo added successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add todo. Please try again.",
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
            const response = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error("Failed to update todo");
            }
            await fetchTodos(currentPage);
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
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
            await fetchTodos(currentPage);
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

    const completedCount = todos.filter((t) => t.completed).length;
    const totalCount = todos.length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header Section */}
                <div className="mb-8 space-y-2">
                    <h1 className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Welcome back!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    {totalCount > 0 && (
                        <div className="flex gap-6 pt-4">
                            <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 dark:border-purple-800 dark:from-purple-900/30 dark:to-indigo-900/30">
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total
                                </div>
                                <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                    {totalCount}
                                </span>
                            </div>
                            <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 dark:border-green-800 dark:from-green-900/30 dark:to-emerald-900/30">
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Completed
                                </div>
                                <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                                    {completedCount}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Todo Card */}
                <Card className="mb-6 border-2 border-purple-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-purple-800 dark:bg-gray-900/90">
                    <CardHeader className="pb-4">
                        <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl text-transparent">
                            Add New Todo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TodoForm onSubmit={(title) => handleAddTodo(title)} />
                    </CardContent>
                </Card>

                {/* Subscription Alert */}
                {!isSubscribed && todos.length >= 3 && (
                    <Alert variant="destructive" className="mb-6 border-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            You&apos;ve reached the maximum number of free todos.{" "}
                            <Link
                                href="/subscribe"
                                className="font-medium underline hover:no-underline"
                            >
                                Subscribe now
                            </Link>{" "}
                            to add more.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Todos Card */}
                <Card className="border-2 border-purple-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-purple-800 dark:bg-gray-900/90">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl text-transparent">
                                Your Todos
                            </CardTitle>
                            {totalCount > 0 && (
                                <span className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow-md">
                                    {completedCount}/{totalCount} done
                                </span>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Input
                            type="text"
                            placeholder="Search todos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-6"
                        />
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                                <p className="text-muted-foreground">Loading your todos...</p>
                            </div>
                        ) : todos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <p className="mb-2 text-lg font-medium">No todos yet</p>
                                <p className="text-muted-foreground">
                                    Get started by adding your first todo above!
                                </p>
                            </div>
                        ) : (
                            <>
                                <ul className="space-y-3">
                                    {todos.map((todo: Todo) => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
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
                                            onPageChange={(page) => fetchTodos(page)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

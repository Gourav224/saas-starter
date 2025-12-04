"use client";

import { useState } from "react";

import { Todo } from "@prisma/client";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TodoItemProps {
    todo: Todo;
    isAdmin?: boolean;
    onUpdate: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, isAdmin = false, onUpdate, onDelete }: TodoItemProps) {
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const toggleComplete = async () => {
        const newCompletedState = !isCompleted;
        setIsCompleted(newCompletedState);
        onUpdate(todo.id, newCompletedState);
    };

    return (
        <Card
            className={cn(
                "border-2 border-purple-100 transition-all hover:border-purple-300 hover:shadow-lg dark:border-purple-900/50 dark:hover:border-purple-700",
                isCompleted && "bg-purple-50/50 opacity-75 dark:bg-purple-950/20",
            )}
        >
            <CardContent className="flex items-center gap-4 p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleComplete}
                    className={cn(
                        "h-8 w-8 shrink-0 rounded-full transition-all hover:scale-110",
                        isCompleted && "text-green-600 dark:text-green-400",
                    )}
                >
                    {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                    )}
                </Button>
                <span
                    className={cn(
                        "flex-1 text-base text-gray-800 dark:text-gray-200",
                        isCompleted && "text-gray-500 line-through dark:text-gray-500",
                    )}
                >
                    {todo.title}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(todo.id)}
                        className="h-8 w-8 text-red-500 transition-all hover:scale-110 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                        <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            {todo.userId.slice(0, 8)}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

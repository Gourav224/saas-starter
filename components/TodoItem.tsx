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
                "border-2 transition-all hover:shadow-md",
                isCompleted && "bg-muted/30 opacity-75",
            )}
        >
            <CardContent className="flex items-center gap-4 p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleComplete}
                    className={cn("h-8 w-8 shrink-0 rounded-full", isCompleted && "text-primary")}
                >
                    {isCompleted ? (
                        <CheckCircle2 className="text-primary h-5 w-5" />
                    ) : (
                        <Circle className="h-5 w-5" />
                    )}
                </Button>
                <span
                    className={cn(
                        "flex-1 text-base",
                        isCompleted && "text-muted-foreground line-through",
                    )}
                >
                    {todo.title}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(todo.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                        <span className="text-muted-foreground bg-muted rounded px-2 py-1 text-xs">
                            {todo.userId.slice(0, 8)}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

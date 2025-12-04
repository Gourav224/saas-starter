"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoFormProps {
    onSubmit: (title: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title.trim());
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="h-11 border-purple-200 text-base focus:border-purple-500 focus:ring-purple-500 dark:border-purple-800"
                required
                autoFocus
            />
            <Button
                type="submit"
                className="h-11 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 font-semibold text-white shadow-md shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/40"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add
            </Button>
        </form>
    );
}

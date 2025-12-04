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
                className="h-11 text-base"
                required
                autoFocus
            />
            <Button type="submit" className="h-11 px-6 font-semibold">
                <Plus className="mr-2 h-4 w-4" />
                Add
            </Button>
        </form>
    );
}

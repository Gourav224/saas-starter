"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-accent mb-4 transition-colors"
        >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
    );
}

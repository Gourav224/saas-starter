import React from "react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="mt-4 flex justify-center space-x-2">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
            >
                Previous
            </Button>
            <span className="flex items-center">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
            >
                Next
            </Button>
        </div>
    );
}

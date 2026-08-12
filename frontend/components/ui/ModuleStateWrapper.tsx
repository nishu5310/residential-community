"use client";

import React from "react";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";

interface ModuleStateWrapperProps {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRetry?: () => void;
  children: React.ReactNode;
}

export const ModuleStateWrapper: React.FC<ModuleStateWrapperProps> = ({
  isLoading = false,
  isError = false,
  errorMessage = "Unable to load data. Please check your network connection and try again.",
  isEmpty = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no items to display at this time.",
  onRetry,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse p-4">
        <div className="h-8 bg-neutral-200 rounded-xl w-1/3" />
        <div className="h-24 bg-neutral-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-neutral-200 rounded-2xl" />
          <div className="h-40 bg-neutral-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="saas-card p-8 text-center border-red-200 bg-red-50/50 space-y-3 my-4">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-red-900">Something went wrong</h3>
        <p className="text-xs text-red-700 max-w-md mx-auto">{errorMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-2xs mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="saas-card p-8 text-center space-y-3 my-4 border-dashed border-neutral-300">
        <div className="w-12 h-12 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-neutral-800">{emptyTitle}</h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">{emptyDescription}</p>
      </div>
    );
  }

  return <>{children}</>;
};

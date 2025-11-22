"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react';

export default function QueryClientsProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>  <ReactQueryDevtools initialIsOpen={false} />
    {children}</QueryClientProvider>
  );
}
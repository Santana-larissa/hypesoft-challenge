import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBootstrapAuth } from "@hooks/useBootstrapAuth";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useBootstrapAuth(); // inicializa sessão a partir do localStorage
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

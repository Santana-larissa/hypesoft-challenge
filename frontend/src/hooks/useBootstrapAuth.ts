import { useEffect } from "react";
import { useAuthStore } from "@stores/authStore";

export function useBootstrapAuth() {
  const hydrate = useAuthStore((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
}

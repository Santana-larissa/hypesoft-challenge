import { useAuthStore } from "@stores/authStore";
import { Button } from "@components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center p-6 text-center space-y-4">
      <h1 className="text-2xl font-semibold">Bem-vindo{user ? `, ${user.name}` : ""}!</h1>
      <Button
        variant="outline"
        onClick={() => {
          clearSession();
          navigate("/login");
        }}
      >
        Sair
      </Button>
    </div>
  );
}

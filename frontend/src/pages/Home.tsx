import { useAuthStore } from "@stores/authStore";
import { Button } from "@components/ui/button";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-6">
     
      <h1 className="text-4xl font-bold -mt-20 mb-4">
        Bem-vindo{user ? `, ${user.name}` : ""}!
      </h1>

     
      <div className="flex flex-row gap-6">
        <Button asChild size="lg" className="px-12 py-6 text-xl">
          <Link to="/categories">Ir para categorias</Link>
        </Button>

        <Button asChild size="lg" className="px-12 py-6 text-xl">
          <Link to="/products">Ir para produtos</Link>
        </Button>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="mt-4 px-8 text-lg"
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

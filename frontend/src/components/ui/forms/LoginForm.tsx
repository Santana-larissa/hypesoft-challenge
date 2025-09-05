import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@services/auth";
import { useAuthStore } from "@stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ email, password }: FormData) => login(email, password),
    onSuccess: ({ user, token }) => {
      setSession(user, token);
      navigate("/");
    },
  });

  const apiMessage =
    (error as any)?.response?.data?.message ||
    (error as any)?.message ||
    null;

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      <div>
        <Input placeholder="Email" type="email" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input placeholder="Senha" type="password" {...register("password")} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {apiMessage && <p className="text-sm text-red-500">{apiMessage}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-center text-sm justify-content: center">
        Não tem conta? <Link to="/register" className="underline">Criar conta</Link>
      </p>
    </form>
  );
}

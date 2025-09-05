import { LoginForm } from "@components/ui/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <LoginForm />
      </div>
    </div>
  );
}

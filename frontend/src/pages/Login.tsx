import { LoginForm } from "@components/ui/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-center">Entrar</h1>
        <LoginForm />
      </div>
    </div>
  );
}

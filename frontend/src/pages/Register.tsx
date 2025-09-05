import { RegisterForm } from "@components/ui/forms/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Criar conta</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoryInput } from "types/category";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
// import { Textarea } from "@components/ui/textarea"; // se não tiver, use <textarea className="...">

const schema = z.object({
  name: z.string().min(2, "Informe o nome"),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

type Props = {
  defaultValues?: Partial<CategoryInput>;
  onSubmit: (data: CategoryInput) => void | Promise<void>;
  submitting?: boolean;
  submitLabel?: string;
};

export function CategoryForm({ defaultValues, onSubmit, submitting, submitLabel = "Salvar" }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input {...register("name")} placeholder="Ex: Eletrônicos" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Enviando..." : submitLabel}
      </Button>
    </form>
  );
}

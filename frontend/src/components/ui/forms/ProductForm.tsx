import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@services/categories";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Informe o nome"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Preço deve ser > 0"),
  quantity: z.coerce.number().int().nonnegative("Quantidade deve ser >= 0"),
  categoryId: z.coerce.number().positive("Selecione uma categoria"),
});
type FormData = z.infer<typeof schema>;

type Props = {
  defaultValues?: Partial<FormData>;
  onSubmit: SubmitHandler<FormData>;
  submitting?: boolean;
  submitLabel?: string;
};

export function ProductForm({
  defaultValues,
  onSubmit,
  submitting,
  submitLabel = "Salvar",
}: Props) {
  const { data: categories, isLoading: loadingCats } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData, any, FormData>({
    resolver: zodResolver<FormData, any, FormData>(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input {...register("name")} placeholder="Ex: Albumina em Pó" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Preço</Label>
          <Input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="59.90"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Quantidade</Label>
          <Input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            placeholder="70"
          />
          {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Categoria</Label>
          <select
            className="w-full rounded-md border bg-transparent p-2"
            disabled={loadingCats}
            {...register("categoryId", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          >
            <option value="" hidden>Selecione…</option>
            {categories?.map((c) => (
              <option key={c.id} value={String(c.id)} className="text-foreground bg-background">
                {c.name} (#{c.id})
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Descrição (opcional)</Label>
        <textarea
          className="w-full rounded-md border p-2 min-h-24 bg-transparent"
          placeholder="Proteína de absorção lenta, ideal para antes de dormir."
          {...register("description")}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Enviando..." : submitLabel}
      </Button>
    </form>
  );
}

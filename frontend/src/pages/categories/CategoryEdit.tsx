import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategory, updateCategory } from "@services/categories";
import { CategoryForm } from "@components/ui/forms/CategoryForm";

export default function CategoryEdit() {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: { id: string | number; name: string; description?: string }) =>
      updateCategory(input.id, { name: input.name}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category", id] });
      nav(`/categories/${id}`);
    },
  });

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error || !data) return <p className="p-4 text-red-500">Categoria não encontrada.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Editar categoria</h1>
      <CategoryForm
        defaultValues={{ name: data.name }}
        submitting={isPending}
        submitLabel="Salvar alterações"
        onSubmit={async (payload) => { await mutateAsync({ id, ...payload }); }}
      />
    </div>
  );
}

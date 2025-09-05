import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@services/categories";
import { useNavigate } from "react-router-dom";
import { CategoryForm } from "@components/ui/forms/CategoryForm";

export default function CategoryCreate() {
  const qc = useQueryClient();
  const nav = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      nav("/categories");
    },
  });

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Nova categoria</h1>
      <CategoryForm
        submitting={isPending}
        onSubmit={async (data) => {
          await mutateAsync(data);
        }}
        submitLabel="Criar"
      />
    </div>
  );
}

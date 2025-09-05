import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@services/products";
import { ProductForm } from "@components/ui/forms/ProductForm";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@components/ui/button";

export default function ProductCreate() {
  const qc = useQueryClient();
  const nav = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      nav("/products");
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Novo produto</h1>
        <Button asChild variant="outline"><Link to="/products">Voltar</Link></Button>
      </div>
      <ProductForm
        submitting={isPending}
        onSubmit={async (data) => {
          await mutateAsync(data);
        }}
        submitLabel="Criar"
      />
    </div>
  );
}

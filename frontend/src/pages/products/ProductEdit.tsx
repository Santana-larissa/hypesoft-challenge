import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProduct, updateProduct } from "@services/products";
import { ProductForm } from "@components/ui/forms/ProductForm";
import { Button } from "@components/ui/button";

export default function ProductEdit() {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: any) => updateProduct(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product", id] });
      nav(`/products/${id}`);
    },
  });

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error || !data) return <p className="p-4 text-red-500">Produto não encontrado.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Editar produto</h1>
        <Button asChild variant="outline"><Link to={`/products`}>Cancelar</Link></Button>
      </div>

      <ProductForm
        defaultValues={{
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          categoryId: Number(data.category?.id),
        }}
        submitting={isPending}
        submitLabel="Salvar alterações"
        onSubmit={async (payload) => { await mutateAsync({ id, ...payload }); }}
      />
    </div>
  );
}

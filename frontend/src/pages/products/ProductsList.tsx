import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listProducts, deleteProduct } from "@services/products";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";

export default function ProductsList() {
  const qc = useQueryClient();
  const nav = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: (id: string | number) => deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro ao carregar produtos</p>;

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <Button onClick={() => nav("/products/new")}>Novo produto</Button>
      </div>

      {!data?.length ? (
        <p className="text-sm text-muted-foreground">Nenhum produto cadastrado.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Qtd</th>
                <th className="p-3">Categoria</th>
                <th className="p-3 w-56">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">R$ {Number(p.price).toFixed(2)}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">{p.category?.name ?? `#${p.category?.id ?? "-"}`}</td>
                  <td className="p-3 space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/products/${p.id}/edit`}>Editar</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={removing}
                      onClick={async () => {
                        if (confirm(`Excluir produto "${p.name}"?`)) {
                          await remove(p.id);
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listCategories, deleteCategory } from "@services/categories";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";

export default function CategoriesList() {
  const qc = useQueryClient();
  const nav = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: (id: string | number) => deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro ao carregar categorias</p>;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categorias</h1>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => nav("/home")}>Voltar</Button>
        <Button onClick={() => nav("/categories/new")}>Nova categoria</Button>
      </div>


      {!data?.length ? (
        <p className="text-sm text-muted-foreground">Nenhuma categoria cadastrada.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3 w-48">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3 space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/categories/${c.id}/edit`}>Editar</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={removing}
                      onClick={async () => {
                        if (confirm(`Excluir categoria "${c.name}"?`)) {
                          await remove(c.id);
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

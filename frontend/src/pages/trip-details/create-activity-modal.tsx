import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

interface CreateActivityModalProps {
  closeCreateActivityModalOpen: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModalOpen,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    function successNotification() {
      toast.success("Atividade criada com sucesso!");
    }
    function errorNotification() {
      toast.error(
        "Erro ao criar atividade! Verifique os dados e tente novamente."
      );
    }

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs-at")?.toString();
    try {
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      });
      localStorage.setItem("sucessMesage", "Ação realizada com sucesso!");
      successNotification();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      errorNotification();
    }
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape  bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeCreateActivityModalOpen}>
              <X className=" size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade"
              className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="datetime-local"
                name="occurs-at"
                placeholder="Data e Horario da atividade"
                className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>
          </div>

          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}

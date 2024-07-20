import { Link2, X, Link, Mail } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

interface CreateGuestsModalProps {
  closeCreateGuestsModal: () => void;
}

export function CreateGuestsModal({
  closeCreateGuestsModal,
}: CreateGuestsModalProps) {
  const { tripId } = useParams();
  async function createGuests(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    function successNotification() {
      toast.success("Convidado adicionado com sucesso!");
    }
    function errorNotification() {
      toast.error(
        "Erro ao adicionar convidado! Verifique os dados e tente novamente."
      );
    }

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    try {
      await api.post(`/trips/${tripId}/invites`, {
        email,
      });

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
            <h2 className="text-lg font-semibold">Convidar novo integrante</h2>
            <button type="button" onClick={closeCreateGuestsModal}>
              <X className=" size-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <form onSubmit={createGuests} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <Button variant="primary" size="full">
            Convidar
          </Button>
        </form>
      </div>
    </div>
  );
}

import { Link2, X, Link } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

interface CreateImportantLinksModalProps{
    closeCreateImportantLinkModal: () => void;
}

export function CreateImportantLinkModal({closeCreateImportantLinkModal}:CreateImportantLinksModalProps){
    const { tripId } = useParams();
    async function createLink(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      function successNotification() {
        toast.success("Link adicionado com sucesso!");
      }
      function errorNotification() {
        toast.error("Erro ao adicionar Link! Verifique os dados e tente novamente.");
      }
  
      const data = new FormData(event.currentTarget);
  
      const title = data.get("title")?.toString();
      const url = data.get("url")?.toString();
     try {await api.post(`/trips/${tripId}/links`, {
    title,
    url,
  });
  window.location.reload();
  successNotification();}
  catch(error){
    errorNotification()
  }
}
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape  bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cadastrar novo link</h2>
              <button type="button" onClick={closeCreateImportantLinkModal}>
                <X className=" size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Todos os convidados podem visualizar os links.
            </p>
          </div>
  
          <form onSubmit={createLink} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                name="title"
                placeholder="Nome do Link"
                className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>
  
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link className="text-zinc-400 size-5" />
              <input
                name="url"
                placeholder="Endereço do link"
                className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>
            <Button variant="primary" size="full">
              Salvar link
            </Button>
          </form>
        </div>
      </div>
    )
}
import { Plus, UserCog } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateImportantLinkModal } from "./create-important-links-modal";
import { Button } from "../../components/button";
import { CreateGuestsModal } from "./create-guests-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setCreateActivityModalOpen] =
    useState(false);
  const [isCreateImportantLinkModal, setCreateImportantLinkModal] = useState(false)
  const [isCreateGuestsModal, setIsCreateGuestsModal] = useState(false)

  function openCreateImportantLinkModal() {
    setCreateImportantLinkModal(true);
  }
  function closeCreateImportantLinkModal() {
    setCreateImportantLinkModal(false);
  }

  function openCreateActivityModalOpen() {
    setCreateActivityModalOpen(true);
  }
  function closeCreateActivityModalOpen() {
    setCreateActivityModalOpen(false);
  }
  function openCreateGuestsModal() {
    setIsCreateGuestsModal(true);
  }
  function closeCreateGuestsModal() {
    setIsCreateGuestsModal(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModalOpen}
              className="bg-lime-300 text-lime-950 rounded-lg text-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5 " />
              Cadastrar atividade
            </button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <h2 className="font-semibold text-xl">Links importantes </h2>
          <ImportantLinks />
          <Button onClick={openCreateImportantLinkModal} variant="secondary" size="full">
            <Plus className="size-5" />
            Cadastrar novo link
          </Button>
          <div className="w-full h-px bg-zinc-800" />
          <Guests />

          <Button onClick={openCreateGuestsModal} variant="secondary" size="full">
            <UserCog className="size-5" />
            Gerenciar convidados
          </Button>
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModalOpen={closeCreateActivityModalOpen}
        />
      )}
      {isCreateImportantLinkModal && (
        <CreateImportantLinkModal
          closeCreateImportantLinkModal={closeCreateImportantLinkModal}

        />
      )}
      {isCreateGuestsModal && (
        <CreateGuestsModal
          closeCreateGuestsModal={closeCreateGuestsModal}

        />
      )}
    </div>
  );
}

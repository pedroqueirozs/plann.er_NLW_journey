import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {ptBR} from "date-fns/locale"


interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  eventsStartAndEndDates: DateRange | undefined;
  destination:string

}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  eventsStartAndEndDates,
  destination
}: ConfirmTripModalProps) {

  const startDate = eventsStartAndEndDates?.from?.toISOString()
  const endDate = eventsStartAndEndDates?.to?.toISOString()
  
  const formatStartDate = startDate
    ? format(startDate, "d' de 'LLLL", {locale:ptBR})
    : null;
  const formatEndDate = endDate
    ? format(endDate, "d' de 'LLLL", {locale:ptBR})
    : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape  bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className=" size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-100 font-semibold">
              {destination}
            </span>{" "}
            nas datas de{" "}
            <span className="text-zinc-100 font-semibold">
              {formatStartDate} a {formatEndDate}{" "}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              onChange={(event) => setOwnerName(event.target.value)}
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              onChange={(event) => setOwnerEmail(event.target.value)}
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent  text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
      
    </div>
  );
}

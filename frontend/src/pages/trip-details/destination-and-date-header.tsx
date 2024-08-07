import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns/format";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  is_confirmed: boolean;
  ends_at: string;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
      .concat(" até ")
      .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;

  function teste() {
    return (
      alert("teste ")
    )
  }

  return (
    <div className=" px-4 h-16 rouded-xl bg-zinc-900 shadow-shape flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <span>
          <MapPin className="size-5 text-zinc-400 " />
        </span>
        <span className=" text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span>
            <Calendar className="size-5 text-zinc-400 " />
          </span>
          <span className=" text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button onClick={teste} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}

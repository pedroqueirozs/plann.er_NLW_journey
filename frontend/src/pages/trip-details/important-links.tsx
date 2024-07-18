import { Link2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
interface Links {
  links:{
    id: string;
    title: string;
    url: string;
  }[];
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);
  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  console.log(typeof links)

  return (
    <div className="space-y-6">
    {links.map((category)=>{
      return(
       <div className="space-y-5 ">
         <div className="flex items-center justify-between gap-4">
           <div className="space-y-1.5 ">
    
             <span className="block font-medium text-zinc-100">
               {/* {links.title} */}
               Titulo
               
             </span>
             <a
               href="#"
               className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
             >
              {/* {links.url} */}
              Url
              
             </a>
           </div>
           <Link2 className="text-zinc-400 size-5 shrink-0" />
         </div>
       </div>  
      )
    })}
      
    </div>
  );
}


  
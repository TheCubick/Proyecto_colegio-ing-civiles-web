import { Cloud, MonitorSmartphone } from "lucide-react";
import { servidorSupabase, supabaseConfigurado } from "../../utils/supabaseClient";

// Distintivo discreto que dice dónde se guarda lo que se hace en el panel.
export default function AvisoModo({ compacto = false }) {
  if (supabaseConfigurado) {
    return (
      <p className="adm-modo adm-modo--nube" title={servidorSupabase}>
        <Cloud size={16} aria-hidden="true" />
        {compacto ? "Conectado a Supabase" : `Conectado a Supabase · ${servidorSupabase}`}
      </p>
    );
  }
  return (
    <p className="adm-modo adm-modo--local">
      <MonitorSmartphone size={16} aria-hidden="true" />
      {compacto ? "Vista previa local" : "Modo Vista Previa Local (Configura .env para conectar a Supabase)"}
    </p>
  );
}

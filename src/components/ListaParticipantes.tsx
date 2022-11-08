import React from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

export const ListaParticipantes = () => {
  const participantes: string[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes.map((participante) => (
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
};

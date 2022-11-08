import shuffle from "just-shuffle";

export function realizarSorteio(participantes: any) {
  const totalDeParticipantes = participantes.length;
  const embaralhado: any = shuffle(participantes);
  const resultado = new Map<string, string>();

  for (let index = 0; index < totalDeParticipantes; index++) {
    const indiceDoAmigo = index === totalDeParticipantes - 1 ? 0 : index + 1;
    resultado.set(embaralhado[index], embaralhado[indiceDoAmigo]);
  }

  return resultado;
}

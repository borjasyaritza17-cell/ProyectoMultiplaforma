// webmulti/src/Api/hpApi.ts
export interface Character {
  name: string;
  house: string;
  image: string;
  actor: string;
  patronus: string;
  gender: string;
}

export async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://hp-api.onrender.com/api/characters");

  if (!res.ok) {
    throw new Error("Error al cargar personajes");
  }

  const data = await res.json();
  return data as Character[];
}

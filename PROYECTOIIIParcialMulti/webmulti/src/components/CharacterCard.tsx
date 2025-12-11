
import type { Character } from "../Api/hpApi";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        width: "200px",
        textAlign: "center",
        background: "#1a1a1a",
        color: "white",
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{
          width: "150px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <h3>{character.name}</h3>
      <p>{character.house || "Sin casa"}</p>
      <p>Actor: {character.actor}</p>
    </div>
  );
}

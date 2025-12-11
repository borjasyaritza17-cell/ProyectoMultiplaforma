import { Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

interface Character {
  name: string;
  image: string;
  house: string;
  actor: string;
  gender?: string;
  patronus?: string;
  dateOfBirth?: string;
  ancestry?: string;
}

export default function App() {
  return (
    <>
      {}
      <header className="hp-header">
        <h1 className="hp-title">HARRY POTTER</h1>

        <nav className="hp-nav">
          <Link className="hp-nav-link" to="/">Inicio</Link>
          <Link className="hp-nav-link" to="/personajes">Personajes</Link>
        </nav>
      </header>

      {}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/detalle/:nombre" element={<DetallePersonaje />} />
      </Routes>
    </>
  );
}


function Inicio() {
  return (
    <section className="inicio-completo">
      <h1>Bienvenidos al mundo mágico</h1>

      <p>Personajes de Harry Potter.</p>

      <p>Navegación:</p>
      <ul>
        <li>• Personajes: Lista de magos y brujas.</li>
        <li>• Detalle: Información específica de un personaje.</li>
      </ul>

      <p>
        Haz clic en <strong>Personajes</strong> en el menú para ver los datos.
      </p>
    </section>
  );
}


function Personajes() {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((json) => {
        setData(json.slice(0, 20)); 
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="cargando">Cargando personajes...</h2>;

  const filtrados = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="personajes-section">
      <h1>Personajes</h1>

      {}
      <div className="buscador-contenedor">
        <input
          type="text"
          className="buscador"
          placeholder="Buscar personaje..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 && (
          <button className="btn-limpiar" onClick={() => setSearch("")}>
            Limpiar
          </button>
        )}
      </div>

      <div className="personajes-grid">
        {filtrados.length === 0 ? (
          <p className="no-resultados">No se encontraron personajes.</p>
        ) : (
          filtrados.map((p) => (
            <div key={p.name} className="personaje-card">
              <img src={p.image} alt={p.name} />

              <h2>{p.name}</h2>

              <Link
                to={`/detalle/${encodeURIComponent(p.name)}`}
                className="btn-detalle"
              >
                Ver detalle
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}


function DetallePersonaje() {
  const { nombre } = useParams();
  const [personaje, setPersonaje] = useState<Character | null>(null);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((json) => {
        const encontrado = json.find((p: any) => p.name === nombre);
        setPersonaje(encontrado || null);
      });
  }, [nombre]);

  if (!personaje) return <h2 className="cargando">Cargando...</h2>;

  return (
    <section className="detalle-section">
      <h1>{personaje.name}</h1>

      <img className="detalle-img" src={personaje.image} alt={personaje.name} />

      <p>
        <strong>Casa:</strong> {personaje.house || "N/A"}
      </p>
      <p>
        <strong>Actor:</strong> {personaje.actor}
      </p>
      <p>
        <strong>Género:</strong> {personaje.gender || "N/A"}
      </p>
      <p>
        <strong>Patronus:</strong> {personaje.patronus || "N/A"}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {personaje.dateOfBirth || "N/A"}
      </p>
      <p>
        <strong>Linaje:</strong> {personaje.ancestry || "N/A"}
      </p>

      <Link to="/personajes" className="btn-volver">
        ← Volver
      </Link>
    </section>
  );
}

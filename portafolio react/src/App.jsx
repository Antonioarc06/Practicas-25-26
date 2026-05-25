import { useState, useEffect } from "react";

const usuarioGithub = "Antonioarc06";

const estudiosIniciales = [
  {
    titulo: "Bachillerato",
    centro: "IES Ramon Giraldo",
    fecha: "2022 - 2024",
  },
  {
    titulo: "Grado Superior de Desarrollo de Aplicaciones Multiplataforma",
    centro: "IES Gregorio Prieto",
    fecha: "2024 - Actualidad",
  },
];

export default function App() {
  const [oscuro, setOscuro] = useState(() => {
    return localStorage.getItem("tema") === "oscuro";
  });

  const [nombreGithub, setNombreGithub] = useState("Cargando...");
  const [repositorios, setRepositorios] = useState([]);

  const [estudios, setEstudios] = useState(estudiosIniciales);
  const [tituloEstudio, setTituloEstudio] = useState("");
  const [centroEstudio, setCentroEstudio] = useState("");
  const [fechaEstudio, setFechaEstudio] = useState("");

  useEffect(() => {
    async function cargarGithub() {
      const respuestaUsuario = await fetch(
        "https://api.github.com/users/" + usuarioGithub
      );
      const usuario = await respuestaUsuario.json();
      setNombreGithub(usuario.login);

      const respuestaRepos = await fetch(
        "https://api.github.com/users/" + usuarioGithub + "/repos"
      );
      const repos = await respuestaRepos.json();
      setRepositorios(repos);
    }

    cargarGithub();
  }, []);

  function cambiarTema() {
    const nuevoOscuro = !oscuro;
    setOscuro(nuevoOscuro);
    localStorage.setItem("tema", nuevoOscuro ? "oscuro" : "claro");
  }

  function agregarEstudio() {
    const nuevoEstudio = {
      titulo: tituloEstudio,
      centro: centroEstudio,
      fecha: fechaEstudio,
    };
    setEstudios([...estudios, nuevoEstudio]);
    setTituloEstudio("");
    setCentroEstudio("");
    setFechaEstudio("");
  }

  return (
    <div className={oscuro ? "oscuro" : ""} style={oscuro ? { backgroundColor: "#222", color: "white" } : { backgroundColor: "white", color: "black" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; margin: 0; }

        header { background-color: #333; color: white; padding: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; position: relative; }
        header h1 { width: 100%; text-align: center; margin: 10px 0; }
        .tema-btn { position: absolute; top: 10px; right: 10px; padding: 8px 12px; }

        nav { width: 100%; }
        nav ul { display: flex; justify-content: center; gap: 20px; list-style: none; padding: 0; flex-wrap: wrap; }
        nav a { color: white; }

        main { padding: 20px; display: grid; grid-template-columns: 1fr; gap: 20px; }

        section { margin-bottom: 15px; padding: 15px; border: 1px solid #ccc; }
        .oscuro section, .oscuro form { background-color: #333; color: white; border: 1px solid #555; }

        .proyectos { display: flex; gap: 10px; flex-wrap: wrap; }
        .proyecto { border: 1px solid #ccc; padding: 10px; width: 200px; }

        .estudios { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
        .estudio { border: 1px solid #ccc; padding: 10px; }

        form { padding: 15px; border: 1px solid #ccc; }
        input, textarea { width: 100%; margin-bottom: 10px; padding: 5px; }
        .oscuro input, .oscuro textarea { background-color: #444; color: white; border: 1px solid #666; }

        button { padding: 8px 12px; }

        footer { background-color: #333; color: white; text-align: center; padding: 10px; }
        .redes { margin-top: 10px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .redes a { color: white; text-decoration: none; }

        .repo { border: 1px solid #ccc; padding: 10px; width: 200px; }

        @media (max-width: 600px) {
          nav ul { flex-direction: column; align-items: center; }
          .proyectos { flex-direction: column; align-items: center; }
          .proyecto { width: 90%; }
        }
      `}</style>

      <header>
        <h1>Antonio Arcos Serrano</h1>
        <button className="tema-btn" onClick={cambiarTema}>Cambiar tema</button>
        <nav>
          <ul>
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#habilidades">Habilidades</a></li>
            <li><a href="#estudios">Estudios</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#sugerencias">Sugerencias</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <article>
          <section id="sobre-mi">
            <h2>Sobre mí</h2>
            <p>Hola! Soy un estudiante de Desarrollo de Aplicaciones Multiplataforma. Me gusta la programación y el diseño de páginas web.</p>
          </section>

          <section id="github">
            <h2>Mi perfil de GitHub</h2>
            <p>
              <strong>Usuario:</strong> <span>{nombreGithub}</span>
            </p>
            <div className="proyectos">
              {repositorios.map((repo) => (
                <div className="repo" key={repo.id}>
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "Sin descripción"}</p>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">Ver repositorio</a>
                </div>
              ))}
            </div>
          </section>

          <section id="habilidades">
            <h2>Habilidades</h2>
            <ul>
              <li>Java</li>
              <li>MySQL</li>
              <li>HTML y CSS</li>
              <li>JavaScript</li>
              <li>Git y GitHub</li>
            </ul>
          </section>

          <section id="estudios">
            <h2>Estudios</h2>
            <div className="estudios">
              {estudios.map((estudio, index) => (
                <div className="estudio" key={index}>
                  <h3>{estudio.titulo}</h3>
                  <p>Centro: {estudio.centro}</p>
                  <p>Fecha: {estudio.fecha}</p>
                </div>
              ))}
            </div>

            <h3>Añadir estudio</h3>
            <input
              type="text"
              placeholder="Título del estudio"
              value={tituloEstudio}
              onChange={(e) => setTituloEstudio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Centro"
              value={centroEstudio}
              onChange={(e) => setCentroEstudio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Fecha"
              value={fechaEstudio}
              onChange={(e) => setFechaEstudio(e.target.value)}
            />
            <button onClick={agregarEstudio}>Agregar estudio</button>
          </section>

          <section id="proyectos">
            <h2>Proyectos futuros</h2>
            <div className="proyectos">
              <div className="proyecto">
                <h3>Proyecto Mini Rogue</h3>
                <p>Versión del juego de mesa Mini Rogue programado en Java.</p>
              </div>
            </div>
          </section>
        </article>

        <section id="sugerencias">
          <h2>Sugerencias</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" required></textarea>

            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

      <footer>
        <p>@Copyright 2026 Antonio Arcos Serrano</p>
        <div className="redes">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

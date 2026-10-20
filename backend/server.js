import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint 4: estado del API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "El API está funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint 5: información de los integrantes
// IMPORTANTE: reemplazar con los datos reales de cada integrante
app.get("/api/info", (req, res) => {
  res.json({
    status: "ok",
    message: "El API está funcionando",
    integrantes: [
      {
        carnet: "00015725",
        ciudadOrigen: "San Salvador ",
        carrera: "Ingeniería Informática",
        cantidadProyectos: 10,
      },
       {
        carnet: "00110125 ",
        ciudadOrigen: "Santa Tecla",
        carrera: "Ingeniería Informática",
        cantidadProyectos: 15,
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

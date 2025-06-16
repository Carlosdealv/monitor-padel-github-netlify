import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@radix-ui/react-select";

import { useEffect } from "react";

// Cargamos las fichas desde un JSON externo
// const fichas = REEMPLAZAR_POR_FICHAS_COMPLETAS;

export default function MonitorPadelTool() {
  const [alumnos, setAlumnos] = useState([""]);
  const [nivel, setNivel] = useState("");
  const [semana, setSemana] = useState("");
  const [ficha, setFicha] = useState(null);
  const [fichas, setFichas] = useState({});

  const handleAlumnoChange = (index, value) => {
    const nuevos = [...alumnos];
    nuevos[index] = value;
    setAlumnos(nuevos);
  };

  const agregarAlumno = () => {
    setAlumnos([...alumnos, ""]);
  };

  const generarEntrenamiento = () => {
    const key = `${nivel}-${semana}`;
    const fichaSeleccionada = fichas[key];
    setFicha(fichaSeleccionada || null);
  };

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Carlosdealv/padel-fichas/main/fichas_padel_journey_ciclos.json")
      .then((res) => res.json())
      .then((data) => setFichas(data));
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Planificador de Clase - Monitor Padel</h1>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <div>
            <label className="font-medium">Nivel promedio del grupo:</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar nivel</option>
              <option value="iniciacion">Iniciación</option>
              <option value="intermedio">Intermedio</option>
              <option value="medio-alto">Medio-Alto</option>
              <option value="competicion">Competición</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Semana del año:</label>
            <select
              value={semana}
              onChange={(e) => setSemana(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar semana</option>
              {[...Array(52).keys()].map((n) => (
                <option key={n} value={n + 1}>{`Semana ${n + 1}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Alumnos en la clase:</label>
            {alumnos.map((nombre, index) => (
              <Input
                key={index}
                placeholder={`Alumno ${index + 1}`}
                value={nombre}
                onChange={(e) => handleAlumnoChange(index, e.target.value)}
                className="mb-2"
              />
            ))}
            <Button variant="outline" onClick={agregarAlumno} type="button">
              + Agregar alumno
            </Button>
          </div>

          <Button onClick={generarEntrenamiento} className="w-full mt-4">
            Generar entrenamiento
          </Button>
        </CardContent>
      </Card>

      {ficha && (
        <Card>
          <CardContent className="pt-4 space-y-2">
            <h2 className="text-xl font-bold">Ficha Semanal</h2>
            <p>
              <strong>Golpe técnico:</strong> {ficha.golpe}
            </p>
            <p>
              <strong>Objetivo técnico:</strong> {ficha.tecnico}
            </p>
            <p>
              <strong>Objetivo táctico:</strong> {ficha.tactico}
            </p>
            <p>
              <strong>Explicación:</strong> {ficha.explicacion}
            </p>
            <p>
              <strong>Físico específico:</strong>
            </p>
            <ul className="list-disc list-inside">
              {ficha.fisico.map((ejer, i) => (
                <li key={i}>{ejer}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
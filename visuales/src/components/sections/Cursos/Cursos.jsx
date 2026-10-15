import React from 'react';
import './CursosYCapacitacion.css';

// Importación de las 4 imágenes enviadas
import imgCurso1 from '../assets/images/image_e6eb1c.jpg'; // Comisión Estatal de Caminos
import imgCurso2 from '../assets/images/image_e6eac1.jpg'; // Día del Constructor de Escuelas
import imgCurso3 from '../assets/images/image_e6eafb.jpg'; // Arranque del Programa de Desinfección del Agua
import imgCurso4 from '../assets/images/image_e6ee7d.jpg'; // Conferencias

export const CursosYCapacitacion = () => {
  const cursos = [
    {
      id: 1,
      titulo: 'Curso 1',
      descripcion: 'Comisión Estatal de Caminos',
      imagen: imgCurso1,
      tipo: 'Curso'
    },
    {
      id: 2,
      titulo: 'Curso 2',
      descripcion: 'Día del Constructor de Escuelas',
      imagen: imgCurso2,
      tipo: 'Curso'
    },
    {
      id: 3,
      titulo: 'Curso 3',
      descripcion: 'Arranque del Programa de Desinfección del Agua',
      imagen: imgCurso3,
      tipo: 'Curso'
    },
    {
      id: 4,
      titulo: 'Curso 4',
      descripcion: 'Conferencias: Día del Constructor de Escuelas',
      imagen: imgCurso4,
      tipo: 'Conferencia'
    }
  ];

  return (
    <div className="cursos-container">
      <div className="cursos-header">
        <h1>Cursos y Capacitación</h1>
        <p>Capacitación técnica y conferencias especializadas para el desarrollo profesional.</p>
      </div>

      <div className="cursos-grid">
        {cursos.map((item) => (
          <div key={item.id} className="curso-card">
            <div className="curso-img-container">
              <img src={item.imagen} alt={item.titulo} />
              <span className={`badge ${item.tipo === 'Conferencia' ? 'badge-conf' : 'badge-curso'}`}>
                {item.tipo}
              </span>
            </div>
            <div className="curso-info">
              <h2>{item.titulo}</h2>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursosYCapacitacion;
import { ClipboardList, Download, FileText, Info, MapPinned, Percent } from "lucide-react";
import { contacto } from "../../../data/contacto";

/*
  DETALLE DE LA CARTA DE REPRESENTANTE TÉCNICO (RTEC), solo en /tramites/rt.
  Los datos están en src/data/requisitos.js (checklistRtec, arancelesRtec, viaticosRtec, formatosRtec)
  y llegan por `datos.rtec` de src/data/tramites.js. Texto oficial del Colegio, sin editar.
  La web solo informa: el trámite y los pagos son 100 % presenciales.
*/
export default function DetalleRtec({ rtec }) {
  const { checklist, notaCuotas, aranceles, viaticos, formatos } = rtec;

  return (
    <section className="rtec-seccion">
      <div className="tr-container rtec-pila">
        {/* ---------- Checklist de 13 requisitos ---------- */}
        <div className="rtec-bloque" aria-labelledby="rtec-checklist-titulo">
          <div className="rtec-cabecera">
            <span className="rtec-icono" aria-hidden="true">
              <ClipboardList size={26} />
            </span>
            <div>
              <h2 id="rtec-checklist-titulo">Requisitos para la carta de RTEC</h2>
              <p>Lista oficial de {checklist.length} puntos para la carta propia y la carta ajena.</p>
            </div>
          </div>

          <ol className="rtec-lista">
            {checklist.map(({ texto, detalle, soloAjena, formato }, i) => (
              <li key={texto}>
                <span className="tr-req-num">{i + 1}</span>
                <div className="rtec-lista-cuerpo">
                  <p>
                    {texto}
                    {soloAjena && <span className="rtec-etiqueta">Solo carta ajena</span>}
                  </p>
                  {detalle && (
                    <ul className="rtec-sublista">
                      {detalle.map((documento) => (
                        <li key={documento}>{documento}</li>
                      ))}
                    </ul>
                  )}
                  {formato && (
                    <a href={formato} download className="rtec-formato">
                      <Download size={16} aria-hidden="true" />
                      Formato en blanco (PDF)
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="tr-nota">
            <Info size={20} aria-hidden="true" />
            <p>{notaCuotas}</p>
          </div>
        </div>

        {/* ---------- Aranceles (Art. 16°) ---------- */}
        <div className="rtec-bloque" aria-labelledby="rtec-aranceles-titulo">
          <div className="rtec-cabecera">
            <span className="rtec-icono" aria-hidden="true">
              <Percent size={26} />
            </span>
            <div>
              <h2 id="rtec-aranceles-titulo">Aranceles profesionales mínimos del RTEC ({aranceles.articulo})</h2>
              <p>{aranceles.criterio}</p>
            </div>
          </div>

          <p className="rtec-cuota">
            <span>Pago mínimo al suscribir el contrato</span>
            <strong>{aranceles.cuotaBase}</strong>
            <small>más el porcentaje que corresponda según el monto contratado</small>
          </p>

          <div className="rtec-tabla-caja">
            <table className="rtec-tabla">
              <caption className="sr-only">Tasa de aplicación según el monto contratado</caption>
              <thead>
                <tr>
                  <th scope="col">Monto contratado desde</th>
                  <th scope="col">Hasta</th>
                  <th scope="col">Tasa de aplicación</th>
                </tr>
              </thead>
              <tbody>
                {aranceles.tasas.map(({ desde, hasta, tasa }) => (
                  <tr key={desde}>
                    <td>{desde}</td>
                    <td>{hasta}</td>
                    <th scope="row">{tasa}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="rtec-nota-texto">{aranceles.nota}</p>
        </div>

        {/* ---------- Viáticos por región ---------- */}
        <div className="rtec-bloque" aria-labelledby="rtec-viaticos-titulo">
          <div className="rtec-cabecera">
            <span className="rtec-icono" aria-hidden="true">
              <MapPinned size={26} />
            </span>
            <div>
              <h2 id="rtec-viaticos-titulo">Viáticos por visita técnica según la región de Chiapas</h2>
              <p>{viaticos.intro}</p>
            </div>
          </div>

          <div className="rtec-tabla-caja">
            <table className="rtec-tabla rtec-tabla--regiones">
              <caption className="sr-only">Días de supervisión y costo diario de viáticos por región</caption>
              <thead>
                <tr>
                  <th scope="col">Región</th>
                  <th scope="col">Zona</th>
                  <th scope="col">Días</th>
                  <th scope="col">Costo por día</th>
                </tr>
              </thead>
              <tbody>
                {viaticos.regiones.map(({ region, nombre, dias, costo }) => (
                  <tr key={region}>
                    <th scope="row">{region}</th>
                    <td>{nombre}</td>
                    <td>{dias}</td>
                    <td>{costo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Formatos en blanco ---------- */}
        <div className="rtec-bloque" aria-labelledby="rtec-formatos-titulo">
          <div className="rtec-cabecera">
            <span className="rtec-icono" aria-hidden="true">
              <FileText size={26} />
            </span>
            <div>
              <h2 id="rtec-formatos-titulo">Formatos en blanco (PDF)</h2>
              <p>
                Descarga e imprime el formato, llénalo y entrégalo en las oficinas del Colegio: {contacto.direccion.completa} El trámite
                es 100 % presencial.
              </p>
            </div>
          </div>

          <ul className="rtec-formatos">
            {formatos.map(({ titulo, ruta }) => (
              <li key={ruta}>
                <a href={ruta} download>
                  <Download size={18} aria-hidden="true" />
                  <span>{titulo}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

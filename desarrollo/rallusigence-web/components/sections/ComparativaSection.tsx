import { columnas, filas, nota } from '@/lib/content/comparativa'
import styles from './ComparativaSection.module.css'

// Tabla comparativa real (<table> con scope). En móvil se apila por criterio
// con CSS puro: cada celda muestra su encabezado vía data-col.
export default function ComparativaSection() {
  return (
    <section id="comparativa" aria-labelledby="comparativa-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.head}>
          <h2 id="comparativa-title" className="rs-h2 reveal">
            Rallusigence vs. las otras opciones
          </h2>
          <p className={`${styles.lead} reveal reveal--delay-1`}>
            3 días, no 30. El precio está publicado, no se cotiza. Y el código, el dominio y el hosting
            quedan en tus cuentas: no estás atado a nosotros.
          </p>
        </div>

        <div className={`${styles.tableWrap} reveal reveal--delay-2`}>
          <table className={styles.table}>
            <caption className="sr-only">
              Comparación de precio, tiempo, propiedad y soporte entre Rallusigence, agencia tradicional, Wix y freelancer
            </caption>
            <thead>
              <tr>
                <th scope="col" className={styles.thCriterio}>Criterio</th>
                {columnas.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`${styles.th} ${i === 0 ? styles.thNos : ''}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.criterio}>
                  <th scope="row" className={styles.criterio}>{f.criterio}</th>
                  {f.valores.map((v, i) => (
                    <td
                      key={i}
                      data-col={columnas[i]}
                      className={`${styles.td} ${i === 0 ? styles.tdNos : ''}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={`${styles.nota} reveal`}>{nota}</p>
      </div>
    </section>
  )
}

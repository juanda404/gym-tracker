import ExerciseLogsList from '../components/ExerciseLogsList'

const Estadisticas = () => {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">📊 Estadísticas</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Track your improvements and metrics.</p>

      {/* Resumen general */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-lg font-bold text-blue-600">58</p>
          <p className="text-sm text-gray-500">Entrenamientos totales</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-lg font-bold text-blue-600">92 h</p>
          <p className="text-sm text-gray-500">Tiempo total entrenado</p>
        </div>
      </section>

      {/* Filtro por mes (a implementar luego) */}
      <section className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-600 mb-1">
          Filtrar por:
        </label>
        <select
          id="filter"
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700"
          defaultValue="julio"
        >
          <option value="julio">Julio 2025</option>
          <option value="junio">Junio 2025</option>
          <option value="mayo">Mayo 2025</option>
        </select>
      </section>

      {/* Historial semanal */}
      <section className="mb-6">
        <h2 className="text-md font-semibold text-gray-700 mb-2">Resumen Semanal (Julio)</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>📅 Semana 1: 2 entrenos - 3h 40min</li>
          <li>📅 Semana 2: 3 entrenos - 5h 15min</li>
          <li>📅 Semana 3: 1 entreno - 1h 20min</li>
          <li>📅 Semana 4: 2 entrenos - 3h 50min</li>
        </ul>
      </section>

      {/* Mejores marcas (placeholder) */}
      <section className="mb-6">
        <h2 className="text-md font-semibold text-gray-700 mb-2">🏅 Mejores Marcas</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Sentadilla: 120 kg</li>
          <li>Press Banca: 95 kg</li>
          <li>Peso Muerto: 140 kg</li>
        </ul>
      </section>

      {/* Evolución gráfica y comparación (pendiente con chart) */}
      <section className="mb-6">
        <h2 className="text-md font-semibold text-gray-700 mb-2">📈 Consistencia Semanal</h2>
        <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
          [Gráfico aquí con Recharts o Chart.js]
        </div>
      </section>

      {/* Lista de ejercicios (ya la tienes) */}
      <section className="mt-8">
        <ExerciseLogsList />
      </section>
    </main>
  )
}

export default Estadisticas
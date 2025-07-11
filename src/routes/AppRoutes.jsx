import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../layout/Layout"
import Inicio from "../pages/Inicio"
import Rutines from "../pages/Rutines"
import History from "../pages/History"
import Estadisticas from "../pages/Estadisticas"
import RoutineDetail from "../pages/RoutineDetail"
import NewWorkoutLog from "../pages/NewWorkoutLog"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutinas" element={<Rutines />} />
        <Route path="/rutinas/:id" element={<RoutineDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/NewWorkoutLog" element={<NewWorkoutLog />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouter
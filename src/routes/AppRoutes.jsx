import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Rutines from '../pages/Rutines'
import History from '../pages/History'
import Estadisticas from '../pages/Estadisticas'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/rutinas" element={<Rutines />} />
      <Route path="/History" element={<History />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
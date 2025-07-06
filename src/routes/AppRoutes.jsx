import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Rutines from '../pages/Rutines'
import History from '../pages/History'
import Estadisticas from '../pages/Estadisticas'
import BottomNav from '../components/BottomNav'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/rutinas" element={<Rutines />} />
      <Route path="/History" element={<History />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
    </Routes>
    <BottomNav />
  </BrowserRouter>
)

export default AppRouter
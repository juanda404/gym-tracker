import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../layout/Layout"
import Inicio from "../pages/Inicio"
import Rutines from "../pages/Rutines"
import History from "../pages/History"
import Estadisticas from "../pages/Estadisticas"
import RoutineDetail from "../pages/RoutineDetail"
import NewWorkoutLog from "../pages/NewWorkoutLog"
import AddExercisesPag from "../pages/AddExercisesPage"
import Login from "../pages/Login"
import ProtectedRoute from "../components/ProtectedRoute"
import Signup from "../components/Signup"
import Profile from "../pages/Profile"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<Login/>}/>

      <Route  element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
        <Route path="/rutinas" element={<Rutines />} />
        <Route path="/rutinas/:id" element={<ProtectedRoute><RoutineDetail /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
        <Route path="/NewWorkoutLog" element={<NewWorkoutLog />}/>
        <Route path="/add-exercises/:workoutLogId" element={<AddExercisesPag />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile/></ProtectedRoute>} />
      </Route>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
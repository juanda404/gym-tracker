import { Outlet } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import Navbar from "../components/Navbar"
import Login from "../pages/Login"

const Layout = () => {
  return (
    <div className="min-h-screen pb-16"> {/* espacio para BottomNav */}
      <Navbar/>
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout
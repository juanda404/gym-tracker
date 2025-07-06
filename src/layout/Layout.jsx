import { Outlet } from "react-router-dom"
import BottomNav from "../components/BottomNav"

const Layout = () => {
  return (
    <div className="min-h-screen pb-16"> {/* espacio para BottomNav */}
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout
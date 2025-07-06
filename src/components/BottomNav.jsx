import {Home,Dumbbell,History,BarChart3 } from "lucide-react"
import { NavLink } from "react-router-dom"

const BottomNav = () =>{
    const navItems = [
        {to:"/", label: "Inicio", icon: <Home size={20} />},
        {to:"/rutinas", label: "Rutinas", icon: <Dumbbell size={20} />},
        {to:"/history", label: "History", icon: <History size={20} />},
        {to:"/estadisticas", label: "Estadisticas", icon: <BarChart3 size={20} />},
    ]


    return(
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-50">
            <ul className="flex justify-around py-2">
                {navItems.map(({ to,label,icon })=>(
                    <li key={to}>
                        <NavLink to={to}
                            className={({ isActive }) => `flex flex-col items-center text-xs ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
                        >
                            {icon}
                              <span className="mt-1">{label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default BottomNav
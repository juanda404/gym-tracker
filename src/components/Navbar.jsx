import { Settings } from "lucide-react"
const Navbar = () => {
    return(
        <header className="w-full bg-white shadow-sm p-2 flex justify-between items-center">
            <div className="flex  items-center gap-2">
                <img src="/public/logojds.webp" alt="logo" className="h-8 w-8 rounded-2xl"/>
                <span className="text-lg font-semibold text-blue-700">Gym</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Welcome,<strong>Juan David</strong> </span>
                <button className="p-2 hover:bg-gray-100 rounded-full" title="Configuration">
                    <Settings className="h-5 w-5 text-gray-500"/>
                </button>
            </div>
        </header>
    )
}

export default Navbar
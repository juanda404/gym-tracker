import { useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import { useUser } from "@supabase/auth-helpers-react"
import { Pencil, LogOut } from "lucide-react"

const Profile = () => {
  const user = useUser()
  const [profile, setProfile] = useState({
    edad: "",
    peso: "",
    altura: "",
    objetivo: "",
    name: ""
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  // Cargar perfil al montar
  useEffect(() => {
    if (user) fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("user_profiles")
      .select("edad, peso, altura, objetivo, name")
      .eq("id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("❌ Error al obtener perfil:", error.message)
      setStatus("Error al cargar perfil")
    } else if (data) {
      setProfile(data)
    }

    setLoading(false)
  }

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    const updates = {
      ...profile,
      id: user.id // importante para upsert
    }

    const { error } = await supabase
      .from("user_profiles")
      .upsert(updates)

    if (error) {
      console.error("❌ Error al guardar perfil:", error.message)
      setStatus("Error al guardar perfil")
    } else {
      setStatus("✅ Perfil actualizado con éxito")
    }

    setLoading(false)
  }

    const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("❌ Error al cerrar sesión:", error.message)
    } else {
      navigate("/") // o "/login" según tu ruta inicial
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h1 className="bg-indigo-500 text-white rounded-t-xl p-3 text-center font-semibold text-lg">Perfil de {profile.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-2 border-t pt-3">
         <h3 className="text-sm text-gray-700 font-medium mb-2 border-b pb-1 border-indigo-500">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Información Personal
          </h3>
        <div className="flex items-center">
          <label className="w-24 flex-none text-sm text-gray-600">Edad<Pencil size={14} className="inline ml-1 text-indigo-500" /></label>
          <input
            type="number"
            name="edad"
            value={profile.edad}
            onChange={handleChange}
            className="w-full p-2 border rounded flex-auto"
          />
          
        </div>
        <div className="flex items-center">
          <label className="w-24 flex-none text-sm text-gray-600">Peso (kg)<Pencil size={14} className="inline ml-1 text-indigo-500" /></label>
          <input
            type="number"
            step="0.1"
            name="peso"
            value={profile.peso}
            onChange={handleChange}
            className="w-full p-2 border rounded flex-auto"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 flex-none text-sm text-gray-600">Altura (m)<Pencil size={14} className="inline ml-1 text-indigo-500" /></label>
          <input
            type="number"
            step="0.01"
            name="altura"
            value={profile.altura}
            onChange={handleChange}
            className="w-full p-2 border rounded flex-auto"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 flex-none text-sm text-gray-600">Objetivo<Pencil size={14} className="inline ml-1 text-indigo-500" /></label>
          <input
            type="text"
            name="objetivo"
            value={profile.objetivo}
            onChange={handleChange}
            className="w-full p-2 border rounded flex-auto"
          />
        </div>
        <div className="grid gap-2">    
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button onClick={handleLogout} className="py-2 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 flex justify-center items-center gap-2">
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>


        {status && (
          <p className="text-sm mt-2 text-center text-blue-700">{status}</p>
        )}
      </form>
    </div>
  )
}

export default Profile
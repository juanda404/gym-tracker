import { Navigate } from "react-router-dom"
import { useUser } from '@supabase/auth-helpers-react'

const ProtectedRoute = ({ children }) => {
  const user = useUser()

  if (!user) return <Navigate to="/Login" />
  return children
}

export default ProtectedRoute
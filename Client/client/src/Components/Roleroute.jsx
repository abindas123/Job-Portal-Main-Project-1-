import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

export default function RoleRoute({allow=[]}){
    const {role}=useAuth()
    if(!role){
        return <Navigate to="/login" replace/>
    }
    return allow.includes(role)?<Outlet/>:<Navigate to="/" replace/>
}
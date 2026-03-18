import { createContext,useContext,useState,useMemo } from "react";
const AuthContext=createContext(null)

export function AuthProvider({children}){
 const [token, Settoken] = useState(() => {
    const t = localStorage.getItem("token")
    return t && t !== "null" ? t : null
    
})

    const [user, Setuser] = useState(() => {
    const raw = localStorage.getItem("user")
    return raw && raw !== "null" ? JSON.parse(raw) : null
})

    const login=({token,user})=>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))
        Settoken(token)
        Setuser(user)


    }
   const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    Settoken(null)
    Setuser(null)
}

   const value = useMemo( () => 
    ({ token, 
        user, 
        role: user?.role || null, 
        isAuthed: Boolean(token), 
        login, 
        logout, }), 
        [token, user] );
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
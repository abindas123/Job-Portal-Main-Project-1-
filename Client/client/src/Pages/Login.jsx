import { useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate, Link as RouterLink, replace } from "react-router-dom";
import { loginUser } from "../Api/Auth";
import { useAuth } from "../Context/Authcontext";

export default function Login(){
    const navigate=useNavigate()
    const{login}=useAuth()

    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState("");

    const handlesubmit=async(e)=>{
        e.preventDefault()
        seterror("")
        if(!email||!password){
            return seterror("email and password required")
        }
        try{
            setloading(true)
            const res=await loginUser({email,password})
            const data=res.data||{}
            const token=res.data.token||null
            const user=res.data.user||null
            if(!token||!user){
                return seterror("missing logging in tokens")
            }
            login({token,user})
            const role=user.role||null
            if(role=="employer") navigate("/employer",{replace:true})
                else navigate("/",{replace:true})


        }catch(err){
            
         const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";
      seterror(msg);
    } finally {
      setloading(false);
    }

    }
    return(
        <Box sx={{display:"grid",placeItems:"center",mt:6}}>
                <Paper sx={{ p: 3, width: "100%", maxWidth: 420 }} elevation={3}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Login
        </Typography>
        {error&&<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
         <Box component="form" onSubmit={handlesubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            autoComplete="email"
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography variant="body2">
            Don’t have an account?{" "}
            <RouterLink to="/register">Register</RouterLink>
          </Typography>
        </Box>
        </Paper>
        </Box>
    )
}
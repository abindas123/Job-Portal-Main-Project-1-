import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { registerUser } from "../Api/Auth";

export default function Register(){

    const navigate=useNavigate()

    const[form,setform]=useState({
        name:"",
        email:"",
        password:"",
        role:"candidate",
        CompanyName:""
    })
    const[error,seterror]=useState("")
    const[success,setsucess]=useState("")
    const[loading,setloading]=useState(false)

    const handlechange=(e)=>{
        setform((prev)=>({
            ...prev,[e.target.name]:e.target.value
        }))

    }
    const handlesubmit=async(e)=>{
        e.preventDefault()
        seterror("")
        setsucess("")
          if (!form.name || !form.email || !form.password || !form.role) {
      seterror("Please fill all required fields.");
      return;
    }

    if (form.role === "employer" && !form.CompanyName.trim()) {
      seterror("Company name is required for employer.");
      return;
    }
    try{
        setloading(true)
    const payload={
        name:form.name,
        email:form.email,
        password:form.password,
        role:form.role,
        ...(form.role==="employer"&&{
            CompanyName:form.CompanyName
        })

    }
    
    const res=await registerUser(payload)
     console.log("Register response:", res.data);

      setsucess("Registration successful. Please login.");
      navigate("/login", { replace: true });
    }catch(err){
      console.error("Register error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Registration failed"
      );
    } finally {
      setloading(false);
    }

    

    }
    return(
        <Box sx={{display:"grid",placeItems:"center",mt:4}}>
             <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form"  onSubmit={handlesubmit} sx={{display:"grid",gap:2}}>
             <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handlechange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handlechange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handlechange}
            fullWidth
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handlechange}
            fullWidth
          >
            <MenuItem value="candidate">Candidate</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </TextField>

          {form.role === "employer" && (
            <TextField
              label="Company Name"
              name="CompanyName"
              value={form.CompanyName}
              onChange={handlechange}
              fullWidth
            />
          )}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <Typography variant="body2">
            Already have an account?{" "}
            <RouterLink to="/login">Login</RouterLink>
          </Typography>

        </Box>
        </Paper>
        </Box>
    )

}
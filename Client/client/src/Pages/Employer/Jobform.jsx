import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,Stack,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {  useNavigate, useParams } from "react-router-dom";
import { createJob, getJobById, updateMyJob } from "../../Api/Jobs";

export default function Jobform({mode}){
    const{id}=useParams()
    const navigate=useNavigate()
     const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "full-time",
    level: "junior",
    skills: "",
    salaryMin: "",
    salaryMax: "",
    currency: "EUR",
  });
  const[loading,setloading]=useState(false)
  const[error,seterror]=useState("")
  const handlechange=(e)=>{
    setForm((prev)=>({...prev,[e.target.name]:e.target.value}))

  }
  useEffect(()=>{
    if (mode==="edit"&&id){
        fetchJob()
    }
  },[mode,id])
  const fetchJob=async()=>{
    setloading(true)
    seterror("")
    try{
        const res=await getJobById(id)
        const job=res.data.job
        setForm({
             title:job.title||"",
    description:job.description||"",
    location:job.location||"",
    type:job.type||"",
    level: job.level||"",
     skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
   salaryMin: job.salaryRange?.min ?? "",
        salaryMax: job.salaryRange?.max ?? "",
        currency: job.salaryRange?.currency || "EUR",

        })
    }catch(err){
         console.error("Fetch job error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load job"
      )
    }finally{
        setloading(false)
    }
  }
  const handlesubmit=async(e)=>{
    e.preventDefault()
    seterror("")
    if (!form.title || !form.description || !form.location || !form.type || !form.level) {
      seterror("Please fill all required fields.");
      return;
    }

    const min = form.salaryMin === "" ? null : Number(form.salaryMin);
    const max = form.salaryMax === "" ? null : Number(form.salaryMax);

    if (min !== null && min < 0) {
      seterror("Minimum salary cannot be negative.");
      return;
    }

    if (max !== null && max < 0) {
      seterror("Maximum salary cannot be negative.");
      return;
    }

    if (min !== null && max !== null && min > max) {
      seterror("Minimum salary cannot be greater than maximum salary.");
      return;
    }
  const payload = {
  title: form.title,
  description: form.description,
  location: form.location,
  type: form.type,
  level: form.level,
  skills: form.skills.split(",").map(s => s.trim()),
  salaryRange: {
    min: form.salaryMin === "" ? null : Number(form.salaryMin),
    max: form.salaryMax === "" ? null : Number(form.salaryMax),
    currency: form.currency
  }
};



    try{
        setloading(true)
        if(mode==="edit"){
            await updateMyJob(id,payload)
        }else{
            await createJob(payload)
        }
        navigate("/employer/jobs",{replace:true})
    }catch(err){
         console.error("Save job error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to save job"
      )

    }finally{
        setloading(false)
    }
  }
  return(
        <Box sx={{ display: "grid", placeItems: "center", mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 750 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
            {mode==="edit"?"Edit Job":"Create Job"}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
         <Box component="form" onSubmit={handlesubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handlechange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handlechange}
            multiline
            minRows={4}
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handlechange}
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={handlechange}
              fullWidth
            >
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="intern">Intern</MenuItem>
            </TextField>

            <TextField
              select
              label="Level"
              name="level"
              value={form.level}
              onChange={handlechange}
              fullWidth
            >
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="mid">Mid</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </TextField>
          </Stack>

          <TextField
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handlechange}
            placeholder="react, node, mongodb"
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Minimum Salary"
              name="salaryMin"
              type="number"
              value={form.salaryMin}
              onChange={handlechange}
              fullWidth
            />

            <TextField
              label="Maximum Salary"
              name="salaryMax"
              type="number"
              value={form.salaryMax}
              onChange={handlechange}
              fullWidth
            />

            <TextField
              label="Currency"
              name="currency"
              value={form.currency}
              onChange={handlechange}
              fullWidth
            />
          </Stack>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading?mode==="edit"?"Editing Job":"Creating Job":mode==="edit"?"Update Job":"Create Job"}
          </Button>
    </Box>
      </Paper>
      </Box>
  )
}
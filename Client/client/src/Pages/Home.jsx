import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getJobs } from "../Api/Jobs";

export default function Home(){
    const[jobs,setjobs]=useState([])
    const[error,seterror]=useState("")
    const[loading,setloading]=useState(false)
    const[filters,setfilters]=useState({
    search: "",
    location: "",
    type: "",
    level: "",
  
    })
    const fetchjobs=async()=>{
        try{
            setloading(true)
            seterror("")
               const params = {
        search: filters.search,
        location: filters.location,
        type: filters.type,
        level: filters.level,
      }
      const res=await getJobs(params)
      setjobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
        }catch(err){
             console.error("Fetch jobs error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load jobs"
      );

        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        fetchjobs()
    },[])
    const handlechange=(e)=>{
        setfilters((prev)=>({
            ...prev,[e.target.name]:e.target.value
        }))

    }
    const handlesearch=(e)=>{
        e.preventDefault()
        fetchjobs()

    }
    const handlereset=()=>{
        const resetfilter={
            search:"",
            location:"",
            type:"",
            level:""
        }
        setfilters(resetfilter)
        setTimeout(async() => {
            try{
            setloading(true)
            seterror("")
            const res=await getJobs(resetfilter)
           setjobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
            }catch(err){
                seterror("failed to load jobs")
            }finally{
                setloading(false)
            }
            
        }, 0);
    }
    return(
<Box>
    <Typography variant="h4" fontWeight={800} gutterBottom>
        Find Jobs
    </Typography>
    <Box component="form" onSubmit={handlesearch} sx={{ mb: 3, display: "grid", gap: 2 }}>
        <TextField
          label="Search"
          name="search"
          value={filters.search}
          onChange={handlechange}
          placeholder="Search by title or skill"
          fullWidth
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
            label="Location"
            name="location"
            value={filters.location}
            onChange={handlechange}
            fullWidth
          />

          <TextField
            select
            label="Type"
            name="type"
            value={filters.type}
            onChange={handlechange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="full-time">Full-time</MenuItem>
            <MenuItem value="part-time">Part-time</MenuItem>
            <MenuItem value="intern">Intern</MenuItem>
          </TextField>

          <TextField
            select
            label="Level"
            name="level"
            value={filters.level}
            onChange={handlechange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>
        </Stack>
        <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={loading}>
                {loading? "Seraching":"Search"}
            </Button>
            <Button variant="outlined" onClick={handlereset}>
            Reset
          </Button>
        </Stack>
    </Box>
    {error&&!jobs.length==0&&(<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}
    {!loading&&jobs.length==0&&( <Typography>No jobs found.</Typography>)}
    <Stack spacing={2}>
        {jobs.map((job)=>(
            <Card key={job._id}>
                <CardContent>
                     <Typography variant="h6" fontWeight={700}>
                {job.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {job.location} • {job.type} • {job.level}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {job.description?.slice(0, 120)}...
              </Typography>
              <Button
              component={RouterLink}
              to={`/jobs/${job._id}`}
              variant="outlined">
                View Details

              </Button>
                </CardContent>

            </Card>
        ))}
    </Stack>
</Box>
    )
}
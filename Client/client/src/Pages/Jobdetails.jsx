import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { getJobById } from "../Api/Jobs";
import { applyToJob } from "../Api/Application";
import { useAuth } from "../Context/Authcontext";

export default function Jobdetails(){
    const{id}=useParams()
    const{isAuthed,role}=useAuth()
    const[jobs,setjobs]=useState(null)
    const[error,seterror]=useState("")
    const[success,setsuccess]=useState("")
    const[loading,setloading]=useState(false)
    const[applyloading,setapplyloading]=useState(false)
    const fetchjob=async()=>{
        try{
            setloading(true)
            seterror("")
            const res=await getJobById(id)
            setjobs(res.data.job)
        }catch(err){
            console.error("Fetch job details error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load job details"
      );
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        fetchjob()
    },[id])
    const handleapply=async()=>{
        try{
        setapplyloading(true)
        seterror("")
        setsuccess("")
        const res=await applyToJob(id,{})
        console.log("applyresponse",res.data)
        setsuccess("applied to job successfully")
        }catch(err){
             console.error("Apply error:", err.message);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to apply for this job"
      );
        }finally{
            setapplyloading(false)
        }

    }
    if(loading){
        return(
             <Box sx={{ display: "grid", placeItems: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
        )
    }
     if (error && !jobs) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!jobs) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        Job not found.
      </Alert>
    );
  }

return(
    <Card>
        <CardContent>
            <Typography variant="h4" fontWeight={500} gutterBottom>
                {jobs.title}

            </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {jobs.type && <Chip label={jobs.type} />}
          {jobs.level && <Chip label={jobs.level} />}
          {jobs.location && <Chip label={jobs.location} />}
        </Stack>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {jobs.description}
        </Typography>

      {jobs.salaryRange && (
  <Typography variant="body2" sx={{ mb: 1 }}>
    <strong>Salary:</strong>{" "}
    {jobs.salaryRange.min ?? "N/A"} - {jobs.salaryRange.max ?? "N/A"}{" "}
    {jobs.salaryRange.currency || "EUR"}
  </Typography>
)}
         {jobs.skills?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Skills Required
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {jobs.skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}
         {jobs.createdBy?.companyName && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Company:</strong> {jobs.createdBy.companyName}
          </Typography>
        )}

        {jobs.createdAt && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Posted on: {new Date(jobs.createdAt).toLocaleDateString()}
          </Typography>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && jobs && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
         {isAuthed && role === "candidate" && (
          <Button
            variant="contained"
            onClick={handleapply}
            disabled={applyloading}
          >
            {applyloading ? "Applying..." : "Apply Now"}
          </Button>
        )}

        {!isAuthed && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Please login as a candidate to apply.
          </Alert>
        )}
        </CardContent>
    </Card>
)
}
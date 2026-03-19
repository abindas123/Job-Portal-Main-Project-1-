import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getMyApplications } from "../../Api/Application";

export default function MyApplications(){
    const[applications,setapplications]=useState([])
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState("")
    const fetchApplications=async()=>{
        try{
            setloading(true)
            seterror("")
            const res=await getMyApplications()
            const validApplications=(res.data,applications||[]).filter((application)=>application.jobid&&application.jobid._id)
            console.log("Job id",application.jobid)
            setapplications(validApplications)
        }catch(err){
            console.error("Fetch applications error:", err);
      seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load applications"
      );
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        fetchApplications()
    },[])
    const getstatuscolor=(status)=>{
        if(status==="shortlisted")return "success"
        if(status=="rejected") return "error"
        return "warning"
    }
      if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }
  return(
    <Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
            My Applications
        </Typography>
        {error&&applications.length!==0&&(
            <Alert severity="error" sx={{mb:2}}>
                {error}
            </Alert>
        )}
        
        {!loading&&applications.length==0&&(
               <Alert severity="info">You have not applied to any jobs yet.</Alert>
        )}
        
        
        <Stack spacing={2}>
            {applications.map((application)=>{
              
                const job=application.jobid||{}
                 
                return(
                  
                    <Card key={application._id || application.id || index}
>
                        <CardContent>
                             <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                 

                  
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {job?.title || "Job Title"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {job?.location || "Location not available"}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Applied on:{" "}
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Box>
                  

                  <Chip
                    label={application.status || "applied"}
                    color={getstatuscolor(application.status)}
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  />
                      
                </Stack>
                      
                {job.id&&(
                    <Box sx={{mt:2}}>
                        <Button component={RouterLink} to={`/jobs/${job.id}`} variant="outlined">
                        View Job
                        </Button>

                    </Box>
                )}
                        </CardContent>

                    </Card>
                )
              
                
            })}
        </Stack>
    </Box>
  )
}
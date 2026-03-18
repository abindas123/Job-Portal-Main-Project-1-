import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getApplicantsForJob,
  updateApplicationStatus,
} from "../../Api/Application";

export default function Applicants(){
    const{id}=useParams()
    const[applications,setapplications]=useState([])
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState("")
    const fetchApplications=async()=>{
        try{
            setloading(true)
            seterror("")
            const res=await getApplicantsForJob(id)
            console.log(res.data)
            setapplications(res.data.applicants)
        }catch(err){
            console.log("error in fetching jobs",err)
            seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load applicants"
      );

        }finally{
            setloading(false)
        }

    }
    useEffect(()=>{
        if(id){
            fetchApplications()
        }
    },[id])

    const getstatuscolor=(status)=>{
        if(status==="shortlisted")return "success"
        if(status==="rejected") return "error"
        return "warning"

    }
    const handlesubmit=async(applicationId,status)=>{
        console.log("application id",applicationId,{status})
        try{
            const res=await updateApplicationStatus(applicationId,{status})
            console.log("succesfully updated",applicationId,status)
            setapplications((prev)=>(
                prev.map((application)=>
                    application._id===applicationId?{...application,status}:application
                )
            ))
        }catch(err){
            seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load applicants"
      );

        }finally{
            setloading(false)
        }

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
    <Typography variant="h4" fontWeight={700} gutterBottom>
        Applicants
    </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading &&applications.length==0&&  (
        <Alert severity="info">No applicants found for this job.</Alert>
      )}
      <Stack spacing={2}>
        {applications.map((application)=>{
            const candidate=application.candidateId||{}
            return(
                <Card key={application._id}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                      {candidate.name || "Candidate"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {candidate.email || "Email not available"}
                    </Typography>
                     <Typography variant="body2" sx={{ mt: 1 }}>
                        Applied On :{application.createdAt?new Date(application.createdAt).toLocaleString():"N/A"}
                        

                        </Typography>
                        <Chip 
                        label={application.status||"applied"}
                        color={getstatuscolor(application.status)}
                        sx={{width: "fit-content",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}/>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <TextField
                    select
                    label="Update Status"
                    value={application.status||"applied"}
                    onChange={(e)=>handlesubmit(application._id,e.target.value)}sx={{maxWidth:220}}>
                        <MenuItem value="applied">applied</MenuItem>
                      <MenuItem value="shortlisted">shortlisted</MenuItem>
                    <MenuItem value="rejected">rejected</MenuItem>
                    

                    </TextField>
                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>

                </Card>
            )
})}
      </Stack>
</Box>
    )


}
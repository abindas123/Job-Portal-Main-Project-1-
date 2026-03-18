import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { deleteMyJob, getMyJobs } from "../../Api/Jobs";

export default function MyJobs(){
    const[jobs,setjobs]=useState([])
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState("")
    const[deleteid,setdeleteid]=useState(null)

    const fetchJobs = async () => {
  try {
    setloading(true);
    seterror("");

    const res = await getMyJobs();
    console.log("My jobs response:", res.data);

    setjobs(res.data.Jobs || []);
  } catch (err) {
    console.error("Fetch my jobs error:", err);
    seterror(
      err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load jobs"
    );
  } finally {
    setloading(false);
  }
};
    useEffect(()=>{
        fetchJobs()
    },[])
    const handledelte=async()=>{
        try{
        setloading(true)
        seterror("")
        await deleteMyJob(deleteid)
        setjobs((prev)=>prev.filter((job)=>job._id!=deleteid))
        setdeleteid(null)
        }catch(err){
            console.log("error in deleteting job",err)
             seterror(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to delete job"
      );
            
        }finally{setloading(false)}

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
             <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700}>
            My Jobs
        </Typography>
        <Button component={RouterLink} to="/employer/jobs/new" variant="contained">
        Create Job
        </Button>
         </Stack>
        {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && jobs.length === 0 && (
        <Alert severity="info">You have not posted any jobs yet.</Alert>
      )}
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
                {job.description?.slice(0, 140)}...
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button component={RouterLink} to={`/employer/jobs/${job._id}/edit`} variant="contained">
                Edit Job</Button>
                <Button component={RouterLink} to={`/employer/jobs/${job._id}/applicants`} variant="outlined">
                View Applicants</Button>
                <Button color="error" variant="contained" onClick={()=>setdeleteid(job._id)}>
                    Delete
                </Button>
              </Stack>
                    </CardContent>

                </Card>
            ))}
        </Stack>
     <Dialog open={Boolean(deleteid)} onClose={()=>setdeleteid(null)}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>setdeleteid(null)}>Cancel</Button>
            <Button onClick={handledelte} color="error" variant="contained">Delete</Button>
        </DialogActions>
     </Dialog>
        </Box>
    )
}
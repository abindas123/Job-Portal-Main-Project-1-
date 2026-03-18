import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function EmployerDashboard(){
    return(
        <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Employer Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage your jobs and review applicants.
      </Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <Card sx={{flex:1}}>
            <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
              Post a New Job
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create a new job opening for candidates.
            </Typography>
            <Button component={RouterLink} to="/employer/jobs/new" variant="contained">
            Create a Job
            </Button>
            </CardContent>
        </Card>
         <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Manage My Jobs
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              View, edit, or delete your posted jobs.
            </Typography>
            <Button
              component={RouterLink}
              to="/employer/jobs"
              variant="outlined"
            >
              View My Jobs
            </Button>
          </CardContent>
        </Card>
      </Stack>
        </Box>
    )
}
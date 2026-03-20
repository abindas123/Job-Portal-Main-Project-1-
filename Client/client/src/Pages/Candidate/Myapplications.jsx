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

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getMyApplications();
       console.log("RAW DATA:", res.data);

      const data = Array.isArray(res.data) ? res.data : res.data.applications || [];
    
      const validApplications = data.filter(
        (application) => application.jobId 
      );

      
      setApplications(validApplications);
    } catch (err) {
      console.error("Fetch applications error:", err);
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    if (status === "shortlisted") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        My Applications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && applications.length === 0 && !error && (
        <Alert severity="info">You have not applied to any jobs yet.</Alert>
      )}

      <Stack spacing={2}>
        {applications.map((application, index) => {
          const job = application.jobId || {};

          return (
            <Card key={application._id || application.id || index}>
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {job.title || "Job Title"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {job.location || "Location not available"}
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
                    color={getStatusColor(application.status)}
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  />
                </Stack>

                {job._id && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      component={RouterLink}
                      to={`/jobs/${job._id}`}
                      variant="outlined"
                    >
                      View Job
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
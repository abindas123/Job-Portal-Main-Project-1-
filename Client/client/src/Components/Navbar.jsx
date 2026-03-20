import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

export default function Navbar() {
  const { isAuthed, role, logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Job Portal
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {!isAuthed && (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}

          {isAuthed && role === "candidate" && (
            <Button color="inherit" component={RouterLink} to="/candidate/applications">
              My Applications
            </Button>
          )}

          {isAuthed && role === "employer" && (
            <>
              <Button color="inherit" component={RouterLink} to="/employer">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/employer/jobs">
                My Jobs
              </Button>
            </>
          )}

          {isAuthed && (
            <Box sx={{ textAlign: "right", lineHeight: 1.1, mx: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Hello, {user?.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85, textTransform: "capitalize" }}>
                {user?.role}
              </Typography>
            </Box>
          )}

          {isAuthed && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
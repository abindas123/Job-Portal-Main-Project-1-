import { AppBar, Toolbar, Typography, Button, Stack,Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

export default function Navbar() {
  const { isAuthed, role, logout, } = useAuth();
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
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}
        >
          Job Portal
        </Typography>

        <Stack direction="row" spacing={1}>
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
          {isAuthed&&(
                     <Box sx={{ display: "flex", justifyContent: "center" }}>
                       <Typography>
                           Hi, {user.name}
                       </Typography>
                        </Box>
          )}

          {isAuthed && role === "candidate" && (
            <Box>
       
                 
            <Button color="inherit" component={RouterLink} to="/candidate/applications">
              My Applications
            </Button>
            </Box>
            
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
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
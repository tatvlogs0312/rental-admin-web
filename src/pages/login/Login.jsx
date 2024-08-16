import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../apis/Api";
import Error from "../../components/error/Error";
import { useAuth } from "../../auth/Auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState("");
  const auth = useAuth();

  //Handle form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var username = data.get("username");
    var password = data.get("password");

    //Call api login
    var user = await login(username, password);
    if (user !== null) {
      auth.login(user);
      navigate("/");
    }

    setTimeout(() => {
      setErrorMsg(null);
    }, 2000);
  };

  //call api login
  const login = async (username, password) => {
    try {
      const res = await axios.post(api.LOGIN_URL_V2, {
        username: username,
        password: password,
      });

      //Lưu token tocalStorage
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user_info", res.data.user);

      return res.data;
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      return null;
    }
  };

  return (
    <div>
      {errorMsg && <Error message={errorMsg} />}

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="username" label="Tài khoản đăng nhập" name="username" autoComplete="username" autoFocus />
              <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" autoComplete="current-password" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;

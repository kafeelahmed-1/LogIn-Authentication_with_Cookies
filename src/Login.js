import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Check for existing cookies on component mount
  useEffect(() => {
    const existingEmail = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="));
    const existingPassword = document.cookie
      .split("; ")
      .find((row) => row.startsWith("password="));

    // If cookies are found, parse their values
    if (existingEmail && existingPassword) {
      const storedEmail = existingEmail.split("=")[1];
      const storedPassword = existingPassword.split("=")[1];

      // Check if cookies are still valid
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const validationEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validationEmail(email)) {
      isValid = false;
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!validPassword(password)) {
      isValid = false;
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }

    if (isValid) {
      // Check if cookies are already set
      const existingEmail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="));
      const existingPassword = document.cookie
        .split("; ")
        .find((row) => row.startsWith("password="));

      // If cookies exist, validate the email and password
      if (existingEmail && existingPassword) {
        const storedEmail = existingEmail.split("=")[1];
        const storedPassword = existingPassword.split("=")[1];

        // Validate credentials
        if (storedEmail === email && storedPassword === password) {
          console.log("Login successful!");
          navigate("/CustomizedTables");
          return; // Exit early if login is successful
        } else {
          alert("Invalid email or password. Please try again.");
          return;
        }
      } else {
        // Set expiry date
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour from now

        // Set cookies for email and password
        document.cookie = `email=${email}; expires=${expiryDate.toUTCString()}; path=/;`;
        document.cookie = `password=${password}; expires=${expiryDate.toUTCString()}; path=/;`;

        console.log("Stored cookies:", document.cookie);
        navigate("/CustomizedTables");
      }
    }
  };

  return (
    <div className="container">
      <Container className="form-container" maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 3,
            fontSize: "2rem",
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { marginBottom: 2, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, padding: "10px 20px", fontSize: "16px" }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}

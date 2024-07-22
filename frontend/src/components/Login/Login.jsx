// components/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Optionally, store user info in state or context
      // ...

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login or any other page after logout
  };

  return (
    <>
      {isLoggedIn ? (
        <Box
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h3>
            Already logged in, want to logout?
          </h3>
          <Button
            onClick={handleLogout}
            size={"4"}
            style={{ cursor: "pointer" }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box
          width={"400px"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            margin: "auto",
          }}
          padding="4"
        >
          <Flex direction="column" gap="3">
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <TextField.Root
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField.Root
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              style={{ cursor: "pointer" }}
              type="submit"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Flex>
          <ToastContainer />
        </Box>
      )}
    </>
  );
};

export default Login;

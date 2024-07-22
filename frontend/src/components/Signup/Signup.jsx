// components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          id: email.split("@")[0],
          email,
          password,
          username: email.split("@")[0],
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <Box
      width={"400px"}
      m={"auto"}
      minHeight={"80vh"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
      padding="4"
    >
      <Flex direction="column" gap="3">
        <h1 style={{ textAlign: "center" }}>Signup Below</h1>
        <TextField.Root
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField.Root
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={{ cursor: "pointer" }}
          type="submit"
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Flex>
      <ToastContainer />
    </Box>
  );
};

export default Signup;

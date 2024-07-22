import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";

const ApplyJob = ({ jobId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append("firstName", formData.firstName);
    // data.append("lastName", formData.lastName);
    // data.append("email", formData.email);
    // data.append("phone", formData.phone);
    // data.append("resume", formData.resume);
    // data.append("coverLetter", formData.coverLetter);
    // data.append("jobId", jobId);

    try {
      //   await axios.post("http://localhost:8000/api/apply", data, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        navigate("/"); // Ensure navigate function is called correctly
      }, 5000); // Navigate after 5 seconds
    } catch (error) {
      console.error("Error submitting application", error);
      toast.error("There was an error submitting your application.");
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "20px" }}>
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Box>
            <Label htmlFor="firstName">First Name</Label>
            <TextField.Root
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <Label htmlFor="lastName">Last Name</Label>
            <TextField.Root
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <Label htmlFor="email">Email</Label>
            <TextField.Root
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <Label htmlFor="phone">Phone</Label>
            <TextField.Root
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <Label htmlFor="resume">Resume</Label>
            <TextField.Root
              type="file"
              name="resume"
              id="resume"
              onChange={handleFileChange}
              required
            />
          </Box>
          <Box>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <TextArea
              name="coverLetter"
              id="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={5}
              required
            />
          </Box>
          <Button type="submit" style={{ cursor: "pointer" }}>
            Submit Application
          </Button>
        </Flex>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ApplyJob;

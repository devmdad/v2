import React, { useContext, useState } from "react";
import styles from "./JobPost.module.css";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { MyContext } from "../../context/MyContext";
import axios from "axios";
import { z } from "zod";

const jobSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  title: z.string().min(1, { message: "Job title is required" }),
  rate: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: "Rate must be a positive number" }),
  location: z.string().min(1, { message: "Location is required" }),
  workType: z.enum(["full-time", "part-time", "internship", "project-work"]),
  experienceLevel: z.enum(["entry-level", "mid-level", "senior-level"]),
  jobType: z.enum(["on-site", "remote"]),
  duration: z.enum(["temporarily", "permanent"]),
  description: z
    .string()
    .max(60000, { message: "Max character limit reached" }),
});

const JobPost = () => {
  const [job, setJob] = useState({
    id: "",
    date: "",
    company: "",
    title: "",
    rate: "",
    location: "",
    workType: "full-time",
    experienceLevel: "mid-level",
    jobType: "on-site",
    duration: "permanent",
    description: "",
  });

  const { allJobs, setAllJobs } = useContext(MyContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field, value) => {
    setJob({
      ...job,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate job data with Zod
      jobSchema.parse(job);

      // If validation passes, submit the form
      const response = await axios.post("http://localhost:8000/api/jobs", job);
      setAllJobs([...allJobs, response.data]);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Extract validation errors
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Flex direction={"column"} justify={"between"} width={"50%"} m={"auto"}>
        <h1>Post Job</h1>
        <Flex gap={"4"} mt={"4"}>
          <Box width={"100%"}>
            <Label htmlFor="title">Job Title</Label>
            <TextField.Root name="title" id="title" onChange={handleChange} />
            {errors.title && (
              <span className={styles.error}>{errors.title}</span>
            )}
          </Box>
          <Box width={"100%"}>
            <Label htmlFor="company">Company Name</Label>
            <TextField.Root
              name="company"
              id="company"
              onChange={handleChange}
            />
            {errors.company && (
              <span className={styles.error}>{errors.company}</span>
            )}
          </Box>
        </Flex>

        <Flex gap={"4"} mt={"4"}>
          <Box width={"100%"}>
            <Label htmlFor="rate">Hourly Rate</Label>
            <TextField.Root name="rate" id="rate" onChange={handleChange} />
            {errors.rate && <span className={styles.error}>{errors.rate}</span>}
          </Box>

          <Box width={"100%"}>
            <Label htmlFor="location">Location</Label>
            <TextField.Root
              name="location"
              id="location"
              onChange={handleChange}
            />
            {errors.location && (
              <span className={styles.error}>{errors.location}</span>
            )}
          </Box>
        </Flex>

        <Flex gap="3" align="center" mt={"4"}>
          <Box width={"100%"}>
            <Label htmlFor="experience">Experience Level</Label>
            <Select.Root
              size="3"
              id="experience"
              value={job.experienceLevel}
              onValueChange={(v) => handleSelectChange("experienceLevel", v)}
            >
              <Select.Trigger>{job.experienceLevel}</Select.Trigger>
              <Select.Content>
                <Select.Item value="entry-level">Entry Level</Select.Item>
                <Select.Item value="mid-level">Mid Level</Select.Item>
                <Select.Item value="senior-level">Senior Level</Select.Item>
              </Select.Content>
            </Select.Root>
            {errors.experienceLevel && (
              <span className={styles.error}>{errors.experienceLevel}</span>
            )}
          </Box>

          <Box width={"100%"}>
            <Label htmlFor="duration">Duration</Label>
            <Select.Root
              size="3"
              id="duration"
              value={job.duration}
              onValueChange={(v) => handleSelectChange("duration", v)}
            >
              <Select.Trigger>{job.duration}</Select.Trigger>
              <Select.Content>
                <Select.Item value="temporarily">Temporarily</Select.Item>
                <Select.Item value="permanent">Permanent</Select.Item>
              </Select.Content>
            </Select.Root>
            {errors.duration && (
              <span className={styles.error}>{errors.duration}</span>
            )}
          </Box>

          <Box width={"100%"}>
            <Label htmlFor="jobtype" style={{ display: "block" }}>
              Job Type
            </Label>
            <Select.Root
              size="3"
              id="jobtype"
              value={job.jobType}
              onValueChange={(v) => handleSelectChange("jobType", v)}
            >
              <Select.Trigger>{job.jobType}</Select.Trigger>
              <Select.Content>
                <Select.Item value="on-site">On-Site</Select.Item>
                <Select.Item value="remote">Remote</Select.Item>
              </Select.Content>
            </Select.Root>
            {errors.jobType && (
              <span className={styles.error}>{errors.jobType}</span>
            )}
          </Box>

          <Box width={"100%"}>
            <Label htmlFor="worktype">Work Type</Label>
            <Select.Root
              size="3"
              id="worktype"
              value={job.workType}
              onValueChange={(v) => handleSelectChange("workType", v)}
            >
              <Select.Trigger>{job.workType}</Select.Trigger>
              <Select.Content>
                <Select.Item value="full-time">Full Time</Select.Item>
                <Select.Item value="part-time">Part Time</Select.Item>
                <Select.Item value="internship">Internship</Select.Item>
                <Select.Item value="project-work">Project Work</Select.Item>
              </Select.Content>
            </Select.Root>
            {errors.workType && (
              <span className={styles.error}>{errors.workType}</span>
            )}
          </Box>
        </Flex>
        <Box>
          <TextArea
            placeholder="Job Description..."
            resize={"vertical"}
            size={"3"}
            mt={"4"}
            onChange={(v) => setJob({ ...job, description: v.target.value })}
          />
        </Box>
        <Button mt={"4"} onClick={handleSubmit}>
          Add Job
        </Button>
      </Flex>
    </div>
  );
};

export default JobPost;

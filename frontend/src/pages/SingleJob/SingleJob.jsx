import React, { useEffect, useState } from "react";
import styles from "./SingleJob.module.css";
import { FaRegBookmark } from "react-icons/fa6";
import { Box, Flex } from "@radix-ui/themes";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../utils";

const SingleJob = ({
  date,
  company,
  location,
  rate,
  jobType,
  workType,
  experienceLevel,
  title,
  duration,
  description,
}) => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/job/${id}`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Flex justify={"between"} align={"center"}>
        <p style={{ fontSize: "14px" }}>{formatDate(job.date)}</p>
        <div className={styles.save}>
          <FaRegBookmark size={"18px"} />
        </div>
      </Flex>
      <Flex direction={"column"}>
        <p>{job.company}</p>
        <h1>{job.title}</h1>
        <Flex className={styles.tags} wrap={"wrap"}>
          <p>{job.workType}</p>
          <p>{job.jobType}</p>
          <p>{job.duration}</p>
          <p>{job.experienceLevel}</p>
        </Flex>
      </Flex>
      <Flex gap={"25%"} mb={"12px"}>
        <p style={{ color: "gray" }}>{job.location}</p>
        <p style={{ fontWeight: 600 }}>${job.rate}/hr</p>
      </Flex>
      <Flex direction={"column"}>
        <p>{job.description}</p>
        <div className={styles.btn}>
          <Link to={"/apply"}>Apply Now</Link>
        </div>
      </Flex>
    </div>
  );
};

export default SingleJob;

import React from "react";
import styles from "./Main.module.css";
import Card from "../Card/Card";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { formatDate } from "../../utils";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { BsBuilding } from "react-icons/bs";

const Main = ({
  filteredJobs,
  jobCount,
  handleJobTitleValue,
  handleLocationValue,
  handleCompanyValue,
}) => {
  const lightColors = [
    "#FFB6C1",
    "#FFCCCB",
    "#FFDAB9",
    "#E6E6FA",
    "#FFFACD",
    "#E0FFFF",
    "#F0FFF0",
    "#F0E68C",
    "#D8BFD8",
    "#98FB98",
    "#F5DEB3",
    "#FFDEAD",
    "#F5F5DC",
    "#FFF8DC",
    "#F5F5F5",
    "#FAFAD2",
    "#E0FFFF",
    "#FAF0E6",
    "#D3D3D3",
    "#FFE4E1",
    "#D8BFD8",
    "#DDA0DD",
    "#B0E0E6",
    "#AFEEEE",
    "#E6E6FA",
  ];

  const getColorForJob = (jobId) => {
    const index = parseInt(jobId, 10) % lightColors.length;
    return lightColors[index];
  };

  return (
    <main className={styles.main}>
      <div
        className="search-container"
        style={{
          backgroundColor: "rgb(58, 128, 226)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          flexWrap: 'wrap',
          // margin: 'auto',
          padding: "30px",
          borderRadius: "5px",
          boxShadow: "4px 4px 20px 1px #919090",
        }}
      >
        <Flex gap="3" className={styles.search}>
          <Box maxWidth="250px">
            <TextField.Root
              radius="full"
              size="3"
              placeholder="Search by job title..."
              style={{ width: "250px" }}
              onChange={(e) => {
                handleJobTitleValue(e.target.value);
              }}
            >
              <TextField.Slot>
                <CiSearch />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Box maxWidth="250px">
            <TextField.Root
              radius="full"
              size="3"
              placeholder="Search by location..."
              style={{ width: "250px" }}
              onChange={(e) => {
                handleLocationValue(e.target.value);
              }}
            >
              <TextField.Slot>
                <CiLocationOn />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Box maxWidth="250px">
            <TextField.Root
              radius="full"
              size="3"
              placeholder="Search by Company..."
              style={{ width: "250px" }}
              onChange={(e) => {
                handleCompanyValue(e.target.value);
              }}
            >
              <TextField.Slot>
                <BsBuilding />
              </TextField.Slot>
            </TextField.Root>
          </Box>
        </Flex>
      </div>
      <p className={styles.jobcount}>Found {jobCount} Jobs</p>
      <div className={styles.container}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              id={job.id}
              date={formatDate(job.date)}
              company={job.company}
              title={job.title}
              rate={job.rate}
              location={job.location}
              workType={job.workType}
              jobType={job.jobType}
              duration={job.duration}
              experienceLevel={job.experienceLevel}
              description={job.description}
              color={getColorForJob(job.id)}
            />
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </main>
  );
};

export default Main;

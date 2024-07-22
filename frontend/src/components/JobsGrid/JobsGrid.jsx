import React, { useContext } from "react";
import jobs from "../../jobs";
import styles from "./JobsGrid.module.css";
import Card from "../Card/Card";
import { MyContext } from "../../context/MyContext";

const JobsGrid = () => {
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

  const {allJobs, setAllJobs} = useContext(MyContext);

  return (
    <div className={styles.container}>
      {allJobs.map((job) => (
        <Card
          key={job.id}
          date={job.date}
          company={job.company}
          title={job.title}
          rate={job.rate}
          location={job.location}
          workType={job.workType}
          jobType={job.jobType}
          duration={job.duration}
          experienceLevel={job.experienceLevel}
          color={lightColors[Math.floor(Math.random() * lightColors.length)]}
        />
      ))}
    </div>
  );
};

export default JobsGrid;

import { FaRegBookmark } from "react-icons/fa6";
import logo from "../../assets/amazon-logo.png";
import styles from "./Card.module.css";
import React from "react";
import SingleJob from "../../pages/SingleJob/SingleJob";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  date,
  company,
  title,
  rate,
  location,
  jobType,
  workType,
  duration,
  experienceLevel,
  color,
}) => {

  const navigate = useNavigate(); // Initialize useNavigate
  const handleDetailsClick = () => {
    navigate(`/job/${id}`); // Navigate to the detailed job page
  };

  const handleShowDetails = () => {
    <SingleJob
      id={id}
      date={date}
      company={company}
      title={title}
      rate={rate}
      location={location}
      jobType={jobType}
      workType={workType}
      duration={duration}
      experienceLevel={experienceLevel}
    />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top} style={{ background: color }}>
        <div className={styles.innerTop}>
          <p>{date}</p>
          <div className={styles.save}>
            <FaRegBookmark />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.companyAndJobTitle}>
            <p className={styles.company}>{company}</p>
            <h3 className={styles.jobTitle}>{title}</h3>
          </div>
          <div className={styles.logoContainer}>
            <img src={logo} />
          </div>
        </div>
        <div className={styles.tags}>
          <div className={styles.tag}>{workType}</div>
          <div className={styles.tag}>{jobType}</div>
          <div className={styles.tag}>{duration}</div>
          <div className={styles.tag}>{experienceLevel}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <p className={styles.rate}>${rate}/hr</p>
          <p className={styles.location}>{location}</p>
        </div>
        <div className={styles.right}>
          <button onClick={handleDetailsClick}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import { MyContext } from "../../context/MyContext";

const Home = () => {
  const [workType, setWorkType] = useState("full-time");
  const [duration, setDuration] = useState("permanent");
  const [jobType, setJobType] = useState("on-site");
  const [experienceLevel, setExperienceLevel] = useState("mid level");
  const [rate, setRate] = useState(30);

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const { allJobs, loading } = useContext(MyContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      const newFilteredJobs = allJobs.filter((job) => {
        const matchesWorkType = workType === "" || workType.includes(job.workType)
        const matchesRate = parseInt(job.rate) >= rate;
        const matchesExperienceLevel =
          experienceLevel === "" || experienceLevel.includes(job.experienceLevel);
        const matchesDuration = duration === "" || duration.includes(job.duration);
        const matchesJobType = jobType === "" || jobType.includes(job.jobType);
        const matchesJobTitle = job.title
          .toLowerCase()
          .includes(jobTitle.toLowerCase());
        const matchesLocation = job.location
          .toLowerCase()
          .includes(location.toLowerCase());
        const matchesCompany = job.company
          .toLowerCase()
          .includes(company.toLowerCase());

        return (
          matchesWorkType &&
          matchesRate &&
          matchesExperienceLevel &&
          matchesDuration &&
          matchesJobType &&
          matchesJobTitle &&
          matchesLocation &&
          matchesCompany
        );
      });

      setFilteredJobs(newFilteredJobs);
      setJobCount(newFilteredJobs.length);
    }
  }, [
    workType,
    duration,
    jobType,
    experienceLevel,
    rate,
    jobTitle,
    location,
    company,
    allJobs,
    loading,
  ]);

  const handleJobTitleValue = (newValue) => setJobTitle(newValue);
  const handleLocationValue = (newValue) => setLocation(newValue);
  const handleCompanyValue = (newValue) => setCompany(newValue);

  const handleWorkTypeValue = (newValue) => setWorkType(newValue);
  const handleExperienceLevelValue = (newValue) => setExperienceLevel(newValue);
  const handleRateValue = (newValue) => setRate(newValue);
  const handleDurationValue = (newValue) => setDuration(newValue);
  const handleJobTypeValue = (newValue) => setJobType(newValue);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <LeftSidebar
          workType={workType}
          rate={rate}
          experienceLevel={experienceLevel}
          duration={duration}
          jobType={jobType}
          handleDurationValue={handleDurationValue}
          handleJobTypeValue={handleJobTypeValue}
          handleExperienceLevelValue={handleExperienceLevelValue}
          handleWorkTypeValue={handleWorkTypeValue}
          handleRateValue={handleRateValue}
        />
      </div>
      <div className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Main
            filteredJobs={filteredJobs}
            jobCount={jobCount}
            handleJobTitleValue={handleJobTitleValue}
            handleLocationValue={handleLocationValue}
            handleCompanyValue={handleCompanyValue}
          />
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

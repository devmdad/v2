import React, { createContext, useState, useEffect } from "react";
import jobs from "../jobs";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await fetch("http://localhost:8000/api/jobs");
        // const data = await response.json();
        const data = jobs;
        setAllJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <MyContext.Provider value={{ allJobs, loading }}>
      {children}
    </MyContext.Provider>
  );
};

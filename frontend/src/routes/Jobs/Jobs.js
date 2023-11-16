import React, { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import JobCard from "./JobCard";
import JoblyApi from "../../api";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../User/UserContext";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser !== null) {
      setIsLoading(true);
      getJob();
    }
  }, []);

  async function getJob(title) {
    //query will look like "nameLike="

    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
    setIsLoading(false);
  }

  if (currentUser === null) {
    return <Navigate to={"/"} />;
  }
  if (isLoading === true || isLoading === null) return <h1>Loading...</h1>;

  return (
    <div className="Jobs">
      {jobs.map((job) => (
        <div className="Jobs-job">
          <JobCard key={uuid()} job={job} />
        </div>
      ))}
    </div>
  );
};

export default Jobs;

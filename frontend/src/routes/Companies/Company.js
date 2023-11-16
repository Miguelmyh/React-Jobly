import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import CompanyCard from "./CompanyCard";
import UserContext from "../User/UserContext";
import JobCard from "../Jobs/JobCard";
import "./Company.css";

const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser !== null) {
      search(handle);
    }
  }, []);

  async function search(handle) {
    try {
      let resp = await JoblyApi.getCompany(handle);
      setCompany(resp);
      setIsLoading(!isLoading);
    } catch (err) {
      console.log("ERRRORRR", err);
    }
  }

  if (currentUser === null) {
    return <Navigate to="/" />;
  }
  if (company) {
    return (
      <div className="Company">
        <CompanyCard company={company} />
        <h2>Jobs:</h2>
        <div className="Company-Jobs">
          {company.jobs.map((job) => (
            <div className="Company-Jobs-job">
              <JobCard key={uuid()} job={job} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
};

export default Company;

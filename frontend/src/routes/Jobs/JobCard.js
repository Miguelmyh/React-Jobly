import React, { useContext, useEffect, useState } from "react";
import UserContext from "../User/UserContext";

const JobCard = ({ job }) => {
  const { applyToJob, appliedToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(() => {
    setApplied(appliedToJob(job.id));
  }, [job.id, appliedToJob]);

  const handleSubmit = (e) => {
    if (appliedToJob(job.id)) return alert("already submitted");
    applyToJob(job.id);
    setApplied(true);
  };

  return (
    <div className="JobCard">
      {applied}
      <h4>{job.title}</h4>
      <div className="JobCard-description">
        <h6>Salary: {job.salary || "unspecified"}</h6>
        <h6>Equity: {job.equity}</h6>
      </div>
      <input
        type="button"
        value={applied ? "applied" : "apply"}
        style={
          applied ? { backgroundColor: "red" } : { backgroundColor: "white" }
        }
        onClick={handleSubmit}
      />
    </div>
  );
};

export default JobCard;

import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../../common/SearchForm";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../User/UserContext";
import "./Companies.css";

const Companies = () => {
  const [companies, setCompanies] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser === null) {
      return;
    } else {
      getComp();
    }
  }, []);

  async function getComp(name) {
    //query will look like "nameLike="

    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  // could make a map for each companies on the state
  //and then create cards for each elemenents

  if (currentUser === null) {
    return <Navigate to="/" />;
  }
  if (!companies) return <h1>Loading..</h1>;
  return (
    <>
      <div className="intro">
        <h1>Company List</h1>
        <div className="Companies-search">
          <SearchForm search={getComp} />
        </div>
      </div>
      <div className="Companies">
        <div className="Companies-all">
          {companies.map((company) => (
            <div className="Companies-Company">
              <Link
                className="Companies-Company-link"
                to={`/companies/${company.handle}`}>
                <CompanyCard company={company} />
              </Link>{" "}
            </div>
          ))}
          <h4>Num of companies: {companies.length}</h4>
        </div>
      </div>
    </>
  );
};

export default Companies;

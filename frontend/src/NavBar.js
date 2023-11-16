import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./routes/User/UserContext";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  const companiesJobs =
    currentUser === null ? null : (
      <>
        <Link className="NavBar-link" to="/companies">
          companies
        </Link>
        <Link className="NavBar-link" to="/jobs">
          jobs
        </Link>
      </>
    );
  const handleClick = (e) => {
    e.preventDefault();
  };

  const signUpLogin =
    currentUser === null ? (
      <>
        <Link className="NavBar-link" to="/login">
          Login
        </Link>
        <Link className="NavBar-link" to="/signup">
          Signup
        </Link>
      </>
    ) : (
      <Link onClick={logout} className="NavBar-link" to={"/logout"}>
        Logout
      </Link>
    );
  return (
    <nav className="NavBar">
      <Link className="NavBar-link" to="/">
        Home
      </Link>
      {companiesJobs}
      {signUpLogin}
    </nav>
  );
};
export default NavBar;

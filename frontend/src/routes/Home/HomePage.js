import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../User/UserContext";
import "./HomePage.css";

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  if (currentUser === null) {
    return (
      <>
        <h1> HomePage</h1>
        <p>Maybe you should Login/signup</p>
      </>
    );
  } else {
    return (
      <div className="HomePage">
        <div className="HomePage-main">
          <h1>Profile: {currentUser.username}</h1>
          <Link className="HomePage-editProfile" to={"/profile"}>
            Edit profile
          </Link>
        </div>

        {/* <div className="HomePage-info">
          <div className="HomePage-main">
            <h1>Profile: {currentUser.username}</h1>
            <Link className="HomePage-editProfile" to={"/edit-profile"}>
              Edit profile
            </Link>
          </div>
          <div className="HomePage-details">
            <div className="HomePage-details-item">
              <p>First Name:</p>
              <p>{currentUser.firstName}</p>
            </div>
            <div className="HomePage-details-item">
              <p>Last Name:</p> <p>{currentUser.lastName}</p>
            </div>
            <div className="HomePage-details-item">
              <p>Email:</p>
              <p>{currentUser.email}</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
};

export default HomePage;

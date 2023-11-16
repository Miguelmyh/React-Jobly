import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [checkingUser, setCheckingUser] = useState(false);

  //currentUser, setCurrentUser, appliedToJob, applyToJob
  // all are saved on the userContext, for forms we may only use currUser and setCurrentUser
  const value = useContext(UserContext);
  console.log(value);

  if (value.currentUser) {
    return <Navigate to={"/"} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setCheckingUser(!checkingUser);
    e.preventDefault();
    const val = await signup(formData);
    if (val.success) {
      navigate("/");
      setCheckingUser(!checkingUser);
    }
    if (val.error) {
      alert("Failed to login", val.error);
    }
  };

  if (checkingUser) {
    return "Redirecting...";
  }
  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      <input
        type="text"
        placeholder="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="first name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="last name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button onSubmit={handleSubmit}>Submit</button>
    </form>
  );
};

export default SignupForm;

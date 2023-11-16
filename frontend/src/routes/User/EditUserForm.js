import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import "./EditUserForm.css";
import JoblyApi from "../../api";

const EditUserForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const INITIAL_VALUE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_VALUE);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let username = formData.username;
    let updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    let updatedUser;
    try {
      updatedUser = await JoblyApi.patchUser(username, updatedData);
    } catch (e) {
      console.log(e);
      return;
    }
    setFormData(INITIAL_VALUE);
    setSuccess(true);
    setCurrentUser(updatedUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  if (!currentUser) return <Navigate to={"/"} />;

  return (
    <form onSubmit={handleSubmit} className="EditUserForm">
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        type="text"
        placeholder="first name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        type="text"
        placeholder="last name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Confirm Password:</label>
      <input
        id="password"
        type="text"
        placeholder={`${currentUser.password}`}
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onSubmit={handleSubmit}>Submit</button>
      {success ? alert("successfully updated") : null}
    </form>
  );
};

export default EditUserForm;

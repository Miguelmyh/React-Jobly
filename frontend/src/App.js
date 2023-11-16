import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./routes/Home/HomePage";
import Companies from "./routes/Companies/Companies";
import Company from "./routes/Companies/Company";
import Jobs from "./routes/Jobs/Jobs";
import NavBar from "./NavBar";
import LoginForm from "./routes/User/LoginForm";
import EditUserForm from "./routes/User/EditUserForm";
import UserContext from "./routes/User/UserContext";
import SignupForm from "./routes/User/SignupForm";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";

// this will be used as the key saved in the local storage with null value at first
//if there is a value in the localStorage, it will always be rendered based of this key
export const TOKEN_STORAGE_ID = "jobly-token";
//why export token_storage_id?-maybe for test..?

//currentUser, setCurrentUser, appliedToJob, applyToJob
// all are saved on the userContext, for forms we may only use currUser and setCurrentUser
function App() {
  const [loaded, setLoaded] = useState(false);
  const [applications, setApplications] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  // TOKEN_STORAGE will be saved as key in the hook,
  // setToken will only change the item state, not the key variable
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    const helper = async () => {
      if (token) {
        console.log(token);
        try {
          let { username } = jwtDecode(token);
          console.log(username);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getUser(username);
          console.log(currentUser);
          setCurrentUser(currentUser);
          setApplications(new Set(currentUser.applications));
        } catch (err) {
          console.log(err);
          setCurrentUser(null);
        }
      }
      setLoaded(true);
    };
    setLoaded(false);
    helper();
  }, [token]);

  const appliedToJob = (jobId) => {
    return applications.has(jobId);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  const applyToJob = (jobId) => {
    if (appliedToJob(jobId)) return;
    JoblyApi.applyToJob(currentUser.username, jobId);
    setApplications(new Set([...applications, jobId]));
  };

  const signup = async (data) => {
    try {
      const token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };

  const login = async (data) => {
    try {
      const token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, appliedToJob, applyToJob }}>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:handle" element={<Company />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/profile" element={<EditUserForm />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

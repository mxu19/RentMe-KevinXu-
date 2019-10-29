import React, { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import SignInSide from "./SignInSide";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import CreateListing from "./CreateListing";
import EditListing from "./EditListing";
function App() {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);
  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() => {
            return (
              <SignInSide
                userRole={userRole}
                setUserRole={setUserRole}
                userId={userId}
                setUserId={setUserId}
              />
            );
          }}
        />

        <Route
          path="/home/signup"
          exact
          render={() => {
            return <SignUp />;
          }}
        />

        <Route
          path="/home/dash"
          exact
          render={() => {
            return (
              <Dashboard
                userRole={userRole}
                userId={userId}
                setUserRole={setUserRole}
              />
            );
          }}
        />

        <Route
          path="/home/dash/create"
          exact
          render={() => {
            return <CreateListing />;
          }}
        />

        <Route
          path="/home/dash/edit/:id"
          exact
          render={() => {
            return <EditListing />;
          }}
        />
      </div>
    </Router>
  );
}

export default App;

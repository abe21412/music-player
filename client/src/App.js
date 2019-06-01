import React, { useState, useEffect } from "react";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [loggedIn, toggleLoggedIn] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    toggleLoggedIn(!loggedIn);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        toggleLoggedIn(false);
        return;
      }
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-key": token
          }
        });
        if (!res.ok) {
          return toggleLoggedIn(false);
        }
        toggleLoggedIn(true);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData();
  }, []);

  while (loggedIn === null) {
    return <div />;
  }
  return (
    <div className="App">
      {!loggedIn ? (
        <Auth toggleLoggedIn={toggleLoggedIn} />
      ) : (
        <Home toggleLoggedIn={toggleLoggedIn} logout={logout} />
      )}
    </div>
  );
};

export default App;

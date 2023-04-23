import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import ResetPassword from "./Components/ResetPassword";
import Profile from "./Components/Profile";
import Context from "./Components/Context";
import Explore from "./Components/Explore";
import FriendProfile from "./Components/FriendProfile";
import Sidebar from "./Components/Sidebar";
import { database } from "./firebase";

function AllRoutes() {
  const { user, logout } = useContext(AuthContext);
  const [databaseUser, setDatabaseUser] = useState("");
  useEffect(() => {
    let unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setDatabaseUser(snapshot.data());
    });

    return () => {
      unsub();
    };
  }, [user]);

  const util = { databaseUser };

  // console.log(user)
  return (
    <Context.Provider value={util}>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ResetPassword />}></Route>
        {/* <Sidebar/> */}
        <Route path="/profile/:id" element={<Profile></Profile>}></Route>
        <Route
          path="/"
          element={user ? <Feed /> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/friend/:id" element={<FriendProfile />}></Route>
      </Routes>
    </Context.Provider>
  );
}

export default AllRoutes;

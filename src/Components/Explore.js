import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadFile from "./UploadFile";
import { database } from "../firebase";
import Posts from "./Posts";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ExplorePosts from "./ExplorePosts";
import RightSidebar from "./RightSidebar";
import './explore.css'

function Feed() {
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

  let videoSrc = "";
  database.posts.get("pUrl").then((url) => {
    videoSrc = url;
  });

  return (
    <>
      {/* <Header user={databaseUser}></Header> */}
      <Sidebar user={databaseUser} />
      <div className="e-main-body">
      <h1 className="header1 e-h">Explore</h1>
        <ExplorePosts user={databaseUser}></ExplorePosts>
      </div>
      <RightSidebar user={databaseUser} />
    </>
  );
}

export default Feed;

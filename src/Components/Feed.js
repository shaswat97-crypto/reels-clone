import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadFile from "./UploadFile";
import { database } from "../firebase";
import Posts from "./Posts";
import Header from "./Header";
import Sidebar from "./Sidebar";
import a from './feed.css'
import RightSidebar from "./RightSidebar";
import context from "./Context";

function Feed() {
  // const { user, logout } = useContext(AuthContext);
  // const [databaseUser, setDatabaseUser] = useState("");
  // useEffect(() => {
  //   let unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
  //     setDatabaseUser(snapshot.data());
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, [user]);
  const util = useContext(context);

  const databaseUser = util.databaseUser;
  // console.log(databaseUser);

  let videoSrc = "";
  database.posts.get("pUrl").then((url) => {
    videoSrc = url;
  });

  return (
    <>
      <Sidebar user={databaseUser} />
      {/* <main className="main-container">
        <div className="main-body"> */}
          <Posts user={databaseUser}></Posts>
        {/* </div>
      </main> */}
      <RightSidebar user={databaseUser} />
    </>
  );
}

export default Feed;

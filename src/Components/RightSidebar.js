import React, { useContext, useEffect, useState } from "react";
import "./rightsidebar.css";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import context from "./Context";

function RightSidebar() {
  const util = useContext(context);
  const user = util.databaseUser;
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);
  return (
    <div className="f-p-right-sidebar">
      <div className="f-p-header">
        <div className="profile-cont">
          <div className="imgcont">
            <img
              className="f-profile-pic"
              src={user.profileUrl}
              alt="Profile Picture"
            />
          </div>
          <div className="namecont">
            <div className="f-user-id">{user.fullName}</div>
            <div className="f-user-name">{user.email}</div>
          </div>
          <Link to={`/profile/${user.userId}`}>
            <button className="f-view-profile-button">View Profile</button>
          </Link>
        </div>
        <div className="f-suggested-users">
          <div className="text">Suggested for you</div>
          {users ? (
            users.map((u) => (
              <>
                {u.userId != user.userId && (
                  <div key={u.email} className="f-suggested-user">
                    <div className="imgcontfriend">
                      <img src={u.profileUrl} alt="" />
                    </div>
                    <div className="namecont">
                      <div className="f-user-name">{u.fullName}</div>
                      <div className="f-user-id">{u.email}</div>
                    </div>
                    <Link to={`/friend/${u.userId}`}>
                      <button className="f-view-profile-button">
                        View Profile
                      </button>
                    </Link>
                  </div>
                )}
              </>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
      <div className="f-footer">
        <nav>
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Press</a>
          <a href="#">API</a>
          <a href="#">Jobs</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Language</a>
          <a href="#">Meta Verified</a>
        </nav>
        <div className="span">
         © 2023 INSTAGRAM FROM META
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;

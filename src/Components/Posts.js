import { Box } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import { database } from "../firebase";
import Video from "./Video";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import CommentIcon from "@mui/icons-material/Comment";
import CommentModal from "./CommentModal";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./posts.css";
function Posts(props) {
  // let { userData } = useContext(AuthContext);
  const [posts, setPosts] = useState();

  // console.log(userData)
  useEffect(() => {
    console.log("fetch posts");
    let unsubscribe;
    async function getCities() {
      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.unshift(doc);
        });
        console.log(arr);
        setPosts(arr);
      });
    }
    getCities();

    return () => unsubscribe();
  }, [db]);

  // console.log(obj, postDatabase);
  return (
    <>
      <div className="postHolder">
        <h1 className="header1">Home</h1>
        {posts ? (
          <div className="post">
            {posts.map((post) => (
              <div className="fragcont">
                <div className="frag" key={post.id}>
                  <Video source={post.data()}></Video>
                  <div className="avatar">
                  <Link to={`/friend/${post.data().user.userId}`} >
                    <Avatar
                      sx={{ cursor: "pointer", mr:1 }}
                      alt={post.data().user && post.data().user.fullName}
                      src={post.data().user && post.data().user.profileUrl}
                    />
                    </Link>
                    <p className="name">
                      {post.data().user && post.data().user.fullName}
                    </p>
                  </div>
                </div>
                <div className="utils">
                  <p className="name">
                    {post.data().user && post.data().user.fullName}
                  </p>
                  <div className="avatar2">
                    <Link to={`/friend/${post.data().user.userId}`}>
                      <Avatar
                        sx={{ cursor: "pointer" }}
                        alt={post.data().user && post.data().user.fullName}
                        src={post.data().user && post.data().user.profileUrl}
                      />
                    </Link>
                  </div>

                  <div className="">
                    <Like user={props.user} post={post}></Like>
                  </div>
                  <CommentModal post={post} user={props.user}></CommentModal>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  );
}

export default Posts;

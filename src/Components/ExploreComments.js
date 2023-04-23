import { Key } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

function Comment({ post }) {
    console.log('chala');
  // console.log(post.comments);
  const [commentArr, setCommentArr] = useState([]);

  useEffect(()=>{
    let postd = post.data();
    console.log('fetch chala', {postd})
    if(postd.comments)
        setCommentArr(postd.comments);
  }, [post]);

  return (
    <div>
      {commentArr == null ? (
        <CircularProgress />
      ) : (
        <>
          {commentArr.map((comment) => (
            <>
              {comment && (
                <div
                  key={comment.comment}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <Avatar src={comment.user.profileUrl} />
                  <p>
                    &nbsp;&nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      {comment.user.userName}
                    </span>
                    &nbsp;&nbsp; {comment.comment}
                  </p>
                </div>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default Comment;

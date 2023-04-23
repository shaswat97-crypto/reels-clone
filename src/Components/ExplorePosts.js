import { Box } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import { database, app } from "../firebase";
import Video from "./Video";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import CommentIcon from "@mui/icons-material/Comment";
import ExploreModalContent from "./ExploreModalContent";
import { AuthContext } from "../Context/AuthContext";
import a from "./exploreposts.css";
import { Modal } from "@mui/material";
import ExploreComments from "./ExploreComments";
import CommentLike from "./CommentLike";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

function Posts(props) {
  // let { userData } = useContext(AuthContext);

  // console.log(userData)
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    console.log("fetch posts");
    let unsubscribe;
    async function getCities() {
      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc);
        });
        setPosts(arr);
      });
    }
    getCities();

    return () => unsubscribe();
  }, []);

  let handleClickMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  // console.log(obj, postDatabase);

  const [open, setOpen] = React.useState(null);

  const handleOpen = (post) => {
    setOpen(post);
  };
  const handleClose = () => setOpen(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    height: "80vh",
    display: "flex",
    // bgcolor: "background.paper",
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    outline: "0",
    "@media(max-width: 800px)": {
      width: "80vw",
    },
    "@media(max-width: 500px)": {
      width: "90vw",
      display: "flex",
      flexDirection: "column",
    },
  };
  const hWidth = {
    width: "50%",
    "@media(max-width: 500px)": {
      width: "100%",
      height: "50%",
    },
  };
  const Wwidth = {
    width: "60%",
    pt: 4,
    pr: 1,
    pl: 1,
    pb: 1,
    "@media(max-width: 500px)": {
      width: "100%",
      height: "50%",
    },
  };

  const [comment, setComment] = React.useState("");
  const handleClick = async (post) => {
    console.log({ comment });
    let obj = {
      comment,
      user:props.user,
    };

    const cityRef = doc(db, "posts", post.id);

    await updateDoc(cityRef, {
      comments: arrayUnion(obj),
    });

    setComment("");
  };

  return (
    <>
      {posts != null ? (
        <div className="exp-videocont">
          {posts.map((post) => (
            <div className="exp-video" key={post.id}>
              <Box onClick={() => handleOpen(post.data().pUrl)}>
                <video
                  //   id={post.id}
                  src={post.data().pUrl}
                  muted
                  autoPlay
                  onClick={(e) => {
                    handleClickMute(e);
                  }}
                ></video>
              </Box>
              <Modal
                open={post.data().pUrl == open}
                onClose={handleClose}
                onBackdropClick={handleClose}
                sx={{
                  "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // set the backdrop color here
                  },
                }}
              >
                <Box sx={style}>
                  <Box sx={hWidth}>
                    <video src={post.data().pUrl} autoPlay loop></video>
                  </Box>
                  <Box sx={Wwidth}>
                    <div className="comeentRight">
                      <div className="apicomments">
                        <ExploreComments post={post}></ExploreComments>
                      </div>
                      <div className="likecommentcont">
                        <div className="likecomment">
                          <CommentLike
                            user={props.user}
                            post={post}
                          ></CommentLike>
                          <TextField
                            sx={{ width: "100%", pl: 1, pr: 1 }}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            id="outlined-basic"
                            label="Type comment here..."
                            size="small"
                            variant="outlined"
                          />
                          <Button
                            variant="outlined"
                            onClick={()=>handleClick(post)}
                          >
                            POST
                          </Button>
                        </div>
                        <div className="text">{post.data().likes.length} likes</div>
                      </div>
                    </div>
                  </Box>
                </Box>
              </Modal>
            </div>
          ))}
        </div>
      ) : (
        <Box key={props.user.createdAt} sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Posts;

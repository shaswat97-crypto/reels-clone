import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./profile.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import CommentIcon from "@mui/icons-material/Comment";
import CommentModal from "./CommentModal";
import { Box } from "@mui/system";
import Video from "./Video";
import UploadImage from "./UploadImage";
import Sidebar from "./Sidebar";
import {
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { Modal, TextField } from "@mui/material";
import ExploreComments from "./ExploreComments";
import CommentLike from "./CommentLike";
import context from "./Context";
import RightSidebar from "./RightSidebar";
// import a from "./sidebar.css";
// import a from './'

function Profile() {
  let { id } = useParams();
  const [databaseUserProfile, setdatabaseUserProfile] = useState(null);
  const [posts, setPosts] = useState(null);
  const util = useContext(context);
  const currentUser = util.databaseUser;
  useEffect(() => {
    database.users.doc(id).onSnapshot((data) => {
      // console.log(data.data())
      setdatabaseUserProfile(data.data());
    });
  }, [id]);

  useEffect(() => {
    // console.log(databaseUserProfile);
    if (databaseUserProfile) {
      console.log("fetch posts");
      let arr;
      async function getCities() {
        const docRef = doc(db, "users", databaseUserProfile.userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          arr = [...docSnap.data().postIdDatabase];
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        // console.log(arr)
        let parr = [];
        await Promise.all(
          arr.map(async (post) => {
            const docSnap = await getDoc(doc(db, "posts", post));
            if (docSnap.exists()) {
              parr.push(docSnap);
            }
          })
        );
        setPosts([...parr]);
      }
      getCities();
    }
  }, [databaseUserProfile]);

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

  let handleClickMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleClick = async (post) => {
    console.log({ comment });
    let obj = {
      comment,
      user: databaseUserProfile,
    };

    const cityRef = doc(db, "posts", post.id);

    await updateDoc(cityRef, {
      comments: arrayUnion(obj),
    });

    setComment("");
  };
  // console.log({ posts, databaseUserProfile, user });
  // console.log(posts && posts[0] && posts[0].data().pUrl);

  return (
    <>
      <Sidebar user={currentUser} />
      {databaseUserProfile && posts ? (
        <div className="p-container">
          <div className="p-header">
            <div className="p-image">
              <Avatar
                sx={{ height: "5rem", width: "5rem" }}
                alt={databaseUserProfile.email}
                src={databaseUserProfile.profileUrl}
              />
            </div>
            <div className="p-right-section">
              <div>
                Name : <b>{databaseUserProfile.fullName}</b>
              </div>
              <div>
                email : <b>{databaseUserProfile.email}</b>
              </div>
              <div>
                Posts :{" "}
                <b>
                  {databaseUserProfile.postIdDatabase
                    ? databaseUserProfile.postIdDatabase.length
                    : 0}
                </b>
              </div>
            </div>
          </div>
          {databaseUserProfile && (
            <div className="p-main-body">
              <>
                {
                  <div className="p-videos">
                    {!databaseUserProfile || !posts ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        {posts.map((post) => (
                          <div className="p-video" key={post.id}>
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
                                  <video
                                    src={post.data().pUrl}
                                    autoPlay
                                    loop
                                  ></video>
                                </Box>
                                <Box sx={Wwidth}>
                                  <div className="comeentRight">
                                    <div className="apicomments">
                                      <ExploreComments
                                        post={post}
                                      ></ExploreComments>
                                    </div>
                                    <div className="likecommentcont">
                                      <div className="likecomment">
                                        <CommentLike
                                          user={databaseUserProfile}
                                          post={post}
                                        ></CommentLike>
                                        <TextField
                                          sx={{ width: "100%", pl: 1, pr: 1 }}
                                          onChange={(e) =>
                                            setComment(e.target.value)
                                          }
                                          value={comment}
                                          id="outlined-basic"
                                          label="Type comment here..."
                                          size="small"
                                          variant="outlined"
                                        />
                                        <Button
                                          variant="outlined"
                                          onClick={() => handleClick(post)}
                                        >
                                          POST
                                        </Button>
                                      </div>
                                      <div className="text">
                                        {post.data().likes.length} likes
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </Box>
                            </Modal>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                }
              </>
            </div>
          )}
        </div>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <RightSidebar user={currentUser} />
    </>
  );
}

export default Profile;

import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../firebase";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";
import {AddCircleOutline as AddCircleOutlineIcon} from "@mui/icons-material";
function UploadFile(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prog, setProgress] = useState(0);

  let handleChange = async (file) => {
    if (!file) {
      setError("No file selected");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("File video larger than 100MB, please select other video");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    console.log(file)
    setLoading(true);
    let uid = uuidv4();
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed", fn1, fn2, fn3); //progress, error, finished

    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done`);
      let prog = progress;
      setProgress(prog);
      // console.log(snapshot.bytesTransferred, snapshot.totalBytes);
    }

    function fn2(err) {
      console.log(err);
      setError(error.code);
      setTimeout(() => setError(""), 2000);
      setLoading(false);
      return;
    }

    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        let obj = {
          likes: [],
          comments: [],
          pIDStorage: uid,
          pUrl: url,
          user:props.user,
          createdAt: database.getTimeStamp(),
        };
        database.posts
          .add(obj)
          .then(async (ref) => {
            // console.log(props.user);
            await database.users.doc(props.user.userId).update({
              postIdDatabase: props.user.postIdDatabase
                ? [...props.user.postIdDatabase, ref.id]
                : [ref.id],
            });
          })
          .catch((err) => {
            console.log(err);
            setError(err.code);
            setTimeout(() => setError(""), 2000);
          });
      });

      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        id="upload"
        onChange={(e) => {
          handleChange(e.target.files[0]);
        }}
      />
      <label htmlFor="upload">
        {error ? (
          <Alert sx={{ fontSize: 13 }} severity="error">
            {error}
          </Alert>
        ) : (
          <div disabled={loading} style={{display:'flex', alignItems:'center', cursor:"pointer"}}>
            <AddCircleOutlineIcon sx={{ fontSize: "33px", color:'gray', mr:3 }} />
            <div>Upload</div>
          </div>
        )}
      </label>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={prog} />
        </Box>
      )}
    </>
  );
}

export default UploadFile;

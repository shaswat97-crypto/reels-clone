import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid'
import { database, storage } from '../firebase';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import UploadIcon from '@mui/icons-material/Upload';


function UploadImage({user}) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [prog, setProgress] = useState(0);

  let handleChange = async (file) => {
    if (!file) {
      setError('No file selected');
      setTimeout(() => { setError('') }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 10) {
      setError('Image file larger than 10MB, please select other image')
      setTimeout(() => { setError('') }, 2000);
      return;
    }
    // console.log(file)
    setLoading(true);
    let uid = uuidv4();
    const uploadTask = storage.ref(`/profileImage/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed', fn1, fn2, fn3);//progress, error, finished
    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done`)
      let prog = progress
      setProgress(prog);
      // console.log(snapshot.bytesTransferred, snapshot.totalBytes);
    }
    function fn2(err) {
      console.log(err);
      setError(error.code);
      setTimeout(() => setError(''), 2000);
      setLoading(false);
      return;
    }
    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL()
        .then((url) => {
          console.log(url)
          database.users.doc(user.uid).update({
            profileUrl:url
          })
          
            .catch((err) => {
              console.log(err);
              setError(err.code);
              setTimeout(() => setError(''), 2000);
            })
        })

      setLoading(false);
    }
  }

  return (
    <div style={{ margin: '2px' }}>
      <input type="file" accept='image/*' style={{ display: 'none' }} id='upload' onChange={(e) => { handleChange(e.target.files[0]) }} />
      <label htmlFor="upload">
        {
          error
            ? <Alert sx={{ fontSize: 13 }} severity="error">{error}</Alert>
            :
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={loading}
            >
               <UploadIcon></UploadIcon> Upload Image
            </Button>
        }
      </label>
      {
        loading &&
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={prog} />
        </Box>
      }
    </div>
  )
}

export default UploadImage
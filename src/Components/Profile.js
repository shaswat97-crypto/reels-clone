import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import './profile.css'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import CommentModal from './CommentModal';
import { Box } from '@mui/system';
import Video from './Video';
import UploadImage from './UploadImage';


function Profile() {
  let { id } = useParams();
  let { user } = useContext(AuthContext);
  const [databaseUser, setdatabaseUser] = useState(null);
  const [postDatabase, setPostDatabase] = useState(null);
  const [postDatabaseObj, setPostDatabaseObj] = useState(null);

  
  useEffect(() => {
    let pArr = []
    let unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      pArr = []; obj={};
      snapshot.forEach((doc) => {
        let data = { ...doc.data(), pId: doc.id };
        obj[data.pId] = data;
        pArr.push(data);
      })
      setPostDatabase(pArr)
      setPostDatabaseObj(obj)
    })
    return unsub;
  }, [])

  useEffect(() => {
    database.users.doc(user.uid).onSnapshot((data) => {
      setdatabaseUser(data.data());
    })
  }, [user.uid])
  let obj = {};
  if(databaseUser && postDatabaseObj){
    console.log(postDatabaseObj)
    databaseUser.postIdDatabase.forEach(id => {
      obj[id] = postDatabaseObj[id].pUrl;
    })
  }
  return (
    <>
      <Header user={databaseUser}></Header>
      {
        user && databaseUser &&postDatabase&&
        <div className="contcont">
          <div className="container">
            <div className="top">
              <div className="left"><Avatar sx={{ height: '5rem', width: '5rem' }} alt={user.email} src={databaseUser.profileUrl} /><UploadImage user={user}></UploadImage></div>
              <div className="right">
                <div>Name : <b>{databaseUser.fullName}</b></div>
                <div>email : <b>{user.email}</b></div>
                <div>Posts : <b>{databaseUser.postIdDatabase ? databaseUser.postIdDatabase.length : 0}</b></div>
              </div>
            </div>
            {
              <div className='bottom'>
                {
                  !postDatabase
                    ?
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                    :
                    <div className='profilePost'>
                      {
                        databaseUser.postIdDatabase.map((pid) => (
                          <div className='profileFrag' key={postDatabaseObj[pid].id}>
                            <Video source={postDatabaseObj[pid]} key={postDatabaseObj[pid].pId}></Video>
                            <div className="commentMod"><CommentModal post={postDatabaseObj[pid]} user={databaseUser}></CommentModal></div>
                          </div>
                        ))
                      }
                    </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Profile
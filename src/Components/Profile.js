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
  useEffect(() => {
    let pArr = []
    let unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      pArr = [];
      snapshot.forEach((doc) => {
        let data = { ...doc.data(), pId: doc.id };
        pArr.push({ ...data });
      })
      setPostDatabase([...pArr])

    })
    return unsub;
  }, [])

  useEffect(() => {
    database.users.doc(user.uid).onSnapshot((data) => {
      setdatabaseUser(data.data());
    })
  }, [user.uid])
  return (
    <>
      <Header user = {databaseUser}></Header>
      {
        user && databaseUser &&
        <div className="contcont">
          <div className="container">
            <div className="top">
              <div className="left"><Avatar sx={{ height: '5rem', width: '5rem' }} alt={user.email} src={databaseUser.profileUrl} /><UploadImage user={user}></UploadImage></div>
              <div className="right">
                <div>Name : {databaseUser.fullName}</div>
                <div>email : {user.email}</div>
                <div>Posts : {databaseUser.postIdDatabase.length}</div>
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
                        postDatabase.map((post) => (
                          <div className='profileFrag' key={post.id}>
                            <Video source={post} key={post.pId}></Video>
                            <div className="likecont"><Like user={databaseUser} post={post}></Like></div>
                            <CommentModal post={post} user={databaseUser}></CommentModal>
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
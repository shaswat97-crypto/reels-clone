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
function Profile() {
  let { id } = useParams();
  let { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
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
      setDbUser(data.data());
    })
  }, [user.uid])
  return (
    <>
      <Header></Header>
      {
        user && dbUser &&
        <div className="contcont">
          <div className="container">
            <div className="top">
              <div className="left"><Avatar sx={{ height: '5rem', width: '5rem' }} alt={user.email} src="/static/images/avatar/1.jpg" /><Button variant='contained'>Upload Image</Button></div>
              <div className="right">
                <div>Name : {dbUser.fullName}</div>
                <div>email : {user.email}</div>
                <div>Posts : {dbUser.postIdDatabase.length}</div>
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
                    <div className='post'>
                      {
                        postDatabase.map((post) => (
                          <div className='frag' key={post.id}>
                            <Video source={post} key={post.pId}></Video>
                            <div className="avatar" >
                              <p className='name'>{dbUser.fullName}</p>
                            </div>
                            <div className="likecont"><Like user={dbUser} post={post}></Like></div>
                            <CommentModal post={post} user={dbUser}></CommentModal>
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
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
import Video from './Video';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Like from './Like';


function Posts(props) {
  // console.log(props)
  const [postDatabase, setPostDatabase] = useState(null);
  useEffect(() => {
    let pArr = []
    // console.log(database.posts)
    let unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      pArr = [];
      snapshot.forEach((doc) => {
        let data = { ...doc.data(), pId: doc.id };
        pArr.push({ ...data });
      })
      // console.log(pArr)
      setPostDatabase([...pArr])
      // console.log(postDatabase)

    })
    // console.log(postDatabase)
    return unsub;
  }, [])
  return (
    <div className='postHolder'>
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
                    <Avatar sx={{ marginRight: 1 }} alt={props.user.fullName} src="/static/images/avatar/1.jpg" />
                    <p className='name'>{props.user.fullName}</p>
                  </div>
                  <div className="likecont"><Like user={props.user} post={post}></Like></div>
                </div>
              ))
            }
          </div>
      }
    </div>
  )
}

export default Posts
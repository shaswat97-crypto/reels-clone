import { Box } from '@mui/system';
import React, { useState, useEffect, useContext } from 'react'
import { database } from '../firebase'
import Video from './Video';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import CommentModal from './CommentModal';
import { AuthContext } from '../Context/AuthContext';
function Posts(props) {
  // let { userData } = useContext(AuthContext);

  // console.log(userData)
  const [userData, setUserData] = useState(null);
  const [postDatabase, setPostDatabase] = useState(null);
  const [obj, setObj] = useState(null);
  useEffect(() => {
    // let userData = [];
    database.users.get()
      .then(arr => {
        // console.log(arr.docs)
        setUserData(arr.docs);
      })
    setUserData(userData);
  }, [database])
  useEffect(() => {
    // console.log(userData);
    let obj = {};
    if (userData && userData.length > 0) {
      userData.forEach(doc => {
        let userObj = doc.data();
        // console.log(userObj);
        let pids = userObj.postIdDatabase;
        pids.forEach(id => {
          obj[id] = [userObj.profileUrl, userObj.fullName];
        })
      })
    }
    setObj(obj);
  }, [userData])

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
  // console.log(obj, postDatabase);
  return (
    <div className='postHolder' >
      {
        postDatabase != null && obj != null && userData.length > 0
          ?
          <div className='post' >
            {
              postDatabase.map((post) => (
                <div className='frag' key={props.user.createdAt}>
                  <Video source={post} key={post.pId}></Video>
                  <div className="avatar" >
                    <Avatar sx={{ marginRight: 1 }} alt={obj[post.pId] ? obj[post.pId][1] : 'guest'} src={obj[post.pId] ? obj[post.pId][0] : ''} />
                    <p className='name'>{obj[post.pId] ? obj[post.pId][1] : 'guest'}</p>
                  </div>
                  <div className="likecont"><Like user={props.user} post={post}></Like></div>
                  <CommentModal post={post} user={props.user}></CommentModal>
                </div>
              ))
            }
          </div>
          :
          <Box key={props.user.createdAt} sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      }
    </div>
  )
}

export default Posts
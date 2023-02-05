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
let obj = {};
function Posts(props) {
  const { userData } = useContext(AuthContext);
  userData.forEach(userObj => {
    let pids = userObj.postIdDatabase;
    pids.forEach(id => {
      obj[id] = [userObj.profileUrl, userObj.fullName];
    })
  })
  const [postDatabase, setPostDatabase] = useState(null);
  // const userData=[];
  // let getUser= ()=>{
  //   database.users.onSnapshot((docArr)=>{
  //     docArr.forEach(doc=>{
  //       userData.push({...doc.data()});
  //       console.log(userData);
  //     })
  //   })
  // }
  // getUser();
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
    <div className='postHolder'>
      {
        postDatabase && obj
          ?
          <div className='post'>
            {
              postDatabase.map((post) => (
                <div className='frag' key={props.user.createdAt}>
                  <Video source={post} key={post.pId}></Video>
                  <div className="avatar" >
                    <Avatar sx={{ marginRight: 1 }} alt={obj[post.pId][1]} src={obj[post.pId][0]?obj[post.pId][0]:''} />
                    <p className='name'>{obj[post.pId][1]}</p>
                  </div>
                  <div className="likecont"><Like user={props.user} post={post}></Like></div>
                  <CommentModal post={post} user={props.user}></CommentModal>
                </div>
              ))
            }
          </div>
          :
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      }
    </div>
  )
}

export default Posts
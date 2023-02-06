import { Key } from '@mui/icons-material';
import { Avatar, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase'
function Comment({ user, post }) {
  // console.log(post.comments);
  const [commentArr, setCommentArr] = useState([]);
  const [userData, setUserData] = useState(null);
  const [obj, setObj] = useState(null);

  useEffect(() => {
    // console.log(userData);
    let obj = {};
    if (userData && userData.length > 0) {
      userData.forEach(doc => {
        let userObj = doc.data();
        // console.log(userObj);
        let pids = userObj.userId;
        obj[pids] = userObj;
    })
  // console.log(obj)
  setObj(obj);
}
    else setObj(null);    
  }, [userData])

useEffect(() => {
  (async () => {
    let arr = []
    for (let i = 0; i < post.comments.length; i++) {
      let data = await database.comments.doc(post.comments[i]).get()
      arr.push(data.data())
    }
    setCommentArr(arr)
  })()
}, [post])

useEffect(() => {
  // let userData = [];
  database.users.get()
    .then(arr => {
      // console.log(arr.docs)
      setUserData(arr.docs);
    })
  setUserData(userData);
}, [database])

return (
  <div>
    {
      commentArr == null || obj == null ? <CircularProgress /> :
        <>
          {
            commentArr.map((comment) => (
              <div key={comment.createdAt} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <Avatar src={obj[comment.user].profileUrl} />
                <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold' }}>{comment.userName}</span>&nbsp;&nbsp; {comment.comment}</p>
              </div>
            ))
          }
        </>
    }
  </div>
)
}

export default Comment
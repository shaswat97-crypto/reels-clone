import { Avatar, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase'
function Comment({ user, post }) {
  // console.log(post.comments);
  const [commentArr, setCommentArr] = useState([]);
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

let obj = {};

const { userData } = useContext(AuthContext);
userData.forEach(userObj => {
  let pids = userObj.userId;
  obj[pids] = userObj;
})
// console.log(obj, commentArr);

  return (
    <div>
      {
        commentArr == null || obj==null ? <CircularProgress /> :
          <>
            {
              commentArr.map((comment) => (
                <div style={{ display: 'flex', alignItems:'center', marginBottom:'6px' }}>
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
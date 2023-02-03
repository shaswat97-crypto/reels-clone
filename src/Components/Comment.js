import { Avatar, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { database } from '../firebase'

function Comment({ post }) {
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

  return (
    <div>
      {
        commentArr == null ? <CircularProgress /> :
          <>
            {
              commentArr.map((comment) => (
                <div style={{ display: 'flex' }}>
                  <Avatar src={'sd'} />
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
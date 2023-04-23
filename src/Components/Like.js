import React, { useEffect, useState, useContext } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
import { AuthContext } from '../Context/AuthContext'


function Like({ post }) {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [databaseUser, setDatabaseUser] = useState('');

  useEffect(() => {
    (async () => {
      database.users.doc(user.uid).get()
        .then((data) => {
          setDatabaseUser(data.data());
          // console.log(databaseUser)
          let check = false;
          // console.log(post.data())
          check = post.data().likes.includes(data.id) ? true : false
          // console.log(check, post.likes, databaseUser)
          setLike(check);
        })

    })()
    // console.log('first fn')
  }, [post], [user])

  let handleClick = async (e) => {
    if (like) {
      let narr = post.data().likes.filter((id) => { return id != databaseUser.userId })
      await database.posts.doc(post.id).update({
        likes: [...narr]
      })
    }
    else {
      let narr = [...post.data().likes, databaseUser.userId]
      await database.posts.doc(post.id).update({
        likes: [...narr]
      })
    }
    // setLike(!like);
  }

  return (
    <React.Fragment>
      {
        like != null && post && databaseUser &&
          like ? <FavoriteIcon sx={{
            fontSize: '25px',
            cursor:'pointer',
            '&:hover': {
              fontSize: '30px',
            },
          }} className='like' onClick={(e) => handleClick(e)}></FavoriteIcon> : <FavoriteIcon sx={{
            fontSize: '25px',
            cursor:'pointer',
            '&:hover': {
              fontSize: '30px',
            },
          }} className='unlike' onClick={(e) => handleClick(e)}></FavoriteIcon>
      }
    </React.Fragment>
  )
}

export default Like
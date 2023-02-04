import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import './profile.css'
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import { Button } from '@mui/material';

function Profile() {
  let { id } = useParams();
  let { user } = useContext(AuthContext);
  // console.log(user)
  const [dbUser, setDbUser] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (dbUser) {
      let arr = [];
      for (let i = 0; i < dbUser.postIdDatabase.length; i++) {
        database.posts.doc(dbUser.postIdDatabase[i]).get()
          .then((data) => {
            arr.push(data.data());
          })
      }
      setPosts(arr);
    }
  }, [dbUser])
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
              posts ?
              <div className="bottom">
                {
                  posts.map((post)=>{
                    <video src={post.pUrl}></video>
                  })
                }
              </div>
              : <div>no post</div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Profile
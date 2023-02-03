import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';
import { database } from '../firebase'
import Posts from './Posts';

function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [databaseUser, setDatabaseUser] = useState('');
  useEffect(() => {
    let unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setDatabaseUser(snapshot.data());
    })

    return () => {
      unsub();
    }
  }, [user])

  let videoSrc = '';
  database.posts.get('pUrl').then(url=>{videoSrc=url});

  return (
    <>
      <header>
        <div>Feed
          <button onClick={logout}>logout</button>
        </div>
        <UploadFile user={databaseUser}></UploadFile>
      </header>
      <main>
        <Posts user={databaseUser}></Posts>
      </main>
    </>
  )
}

export default Feed
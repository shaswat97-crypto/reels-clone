import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';
import {database} from '../firebase'

function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [databaseUser, setDatabaseUser] = useState('');
  useEffect(() => {
    let unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setDatabaseUser(snapshot.data());
    })
  
    return () => {
      unsub();
    }
  }, [user])
  
  return (
    <>
      <div>Feed
        <button onClick={logout}>logout</button>
      </div>
      <UploadFile user={databaseUser}></UploadFile>
    </>
  )
}

export default Feed
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Feed() {
    const {logout} = useContext(AuthContext);
  return (
    <div>Feed
        <button onClick={logout}>logout</button>
    </div>
  )
}

export default Feed
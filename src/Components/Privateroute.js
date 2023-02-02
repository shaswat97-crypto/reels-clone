import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'
import Feed from './Feed';

function Privateroute() {
  // console.log(Component, rest);
  const { user } = useContext(AuthContext);
  return (
    <Route render={(props) => {
      return user ? <Feed {...props}></Feed> : <Navigate to='/login'></Navigate>
    }}>
    </Route>
  )
}

export default Privateroute
import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'

function Privateroute({component:Component}, ...rest) {
    const {user} = useContext(AuthContext);
  return (
    <Route {...rest} render={props=>{
        return user?<Component{...props}></Component>:<Navigate to='login'></Navigate>
    }}></Route>
  )
}

export default Privateroute
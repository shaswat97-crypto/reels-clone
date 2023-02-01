import React, { useState, useEffect } from "react";


import Login from '../Components/Login';
import Signup from '../Components/Signup';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import { auth } from "../firebase";
//context api ka store bana liye aur export kiye
export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    // console.log(props, props.children.props.children);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    //adding event listener whenever there is change in auth state
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })

        //jab ye component unmount hoga, to uspe se event listener hat jaega
        return () => {
            unsub();//clean up
        }
    }, [])

    const store = {
        user,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

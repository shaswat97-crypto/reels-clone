import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import { auth, database } from "../firebase";
//context api ka store bana liye aur export kiye
export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    const [userData, setUserData] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(()=>{
        let arr=[];
        let unsub = database.posts.onSnapshot((snap)=>{
            snap.forEach(doc=>{
                arr.push(doc.data())
            })
        })
        setUserPosts(arr);

        return unsub;
    },[])

    useEffect(()=>{
        let arr=[];
        let unsub = database.users.onSnapshot((snap)=>{
            snap.forEach(doc=>{
                arr.push(doc.data())
            })
        })
        setUserData(arr);

        return unsub;
    },[])
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
            //state changed matlab naya userid ya password aaya to ab latest user nuje mil jaega, ab me us user ko set kar sakta hu
            //user kya hai, auth vaala user object hai
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
        logout,
        userData,
        userPosts
    }
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

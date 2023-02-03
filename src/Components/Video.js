import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
import  ReactDOM  from 'react-dom';


function Video(props) {
    // console.log(props)
    let handleClick = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    let handleScroll = (e) => {
        // console.log(e.target, ReactDOM.findDOMNode(e.target).parentNode.nextSibling);
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        // console.log(next);
        if(next){
            next.scrollIntoView()
            e.target.muted = true;
        }
    }
    return (
        <div className='videocont' >
            <video id={props.source.id} src={props.source.pUrl} muted='muted' onClick={(e)=>{handleClick(e)}} onEnded={(e)=>{handleScroll(e)}} autoPlay></video>
            
        </div>
    )
}

export default Video
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';


function Like({ user, post }) {
    // console.log(user, post)
    const [like, setLike] = useState(null);

    useEffect(() => {
        let check = false;
        check = post.data().likes && post.data().likes.includes(user.userId) ? true : false
        setLike(check);
    }, [post])

    let handleClick = async (e) => {
        if (like) {
            let narr = post.data().likes.filter((id)=>{return id!=user.userId})
            await database.posts.doc(post.id).update({
                likes: [...narr]
            })
        }
        else {
            let narr = [...post.data().likes, user.userId]
            await database.posts.doc(post.id).update({
                likes: [...narr]
            })
        }
        // setLike(!like);
    }
    return (
        <React.Fragment>
            {
                like != null && post && user &&
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
                      }} className='unlike2' onClick={(e) => handleClick(e)}></FavoriteIcon>
            }
        </React.Fragment>
    )
}

export default Like
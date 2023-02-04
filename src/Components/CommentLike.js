import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';


function Like({ user, post }) {
    // console.log(user, post)
    const [like, setLike] = useState(null);
    useEffect(() => {
        let check = false;
        check = post.likes.includes(user.userId) ? true : false
        setLike(check);
    }, [post.likes])
    let handleClick = async (e) => {
        if (like) {
            let narr = post.likes.filter((id)=>{return id!=user.userId})
            await database.posts.doc(post.pId).update({
                likes: [...narr]
            })
        }
        else {
            let narr = [...post.likes, user.userId]
            await database.posts.doc(post.pId).update({
                likes: [...narr]
            })
        }
        // setLike(!like);
    }
    return (
        <React.Fragment>
            {
                like != null && post && user &&
                    like ? <FavoriteIcon className='like' onClick={(e) => handleClick(e)}></FavoriteIcon> : <FavoriteIcon className='unlike2' onClick={(e) => handleClick(e)}></FavoriteIcon>
            }
        </React.Fragment>
    )
}

export default Like
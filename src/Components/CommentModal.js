import React from 'react'
import CommentIcon from '@mui/icons-material/Comment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Like from './Like';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CommentLike from './CommentLike'
import { database } from '../firebase';
import Comment from './Comment';
import { display, height } from '@mui/system';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  height: '80vh',
  display: 'flex',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
  outline: '0',
  '@media(max-width: 800px)': {
    width: '80vw'
  },
  '@media(max-width: 500px)': {
    width: '90vw',
    display: 'flex',
    flexDirection:'column'
  }
};
const hWidth = {
  width: '50%',
  '@media(max-width: 500px)': {
    width: '100%',
    height: '50%'
  }
}
const Wwidth = {
  width: '60%', pt: 4, pr: 1, pl: 1, pb: 1,
  '@media(max-width: 500px)' : {
    width: '100%',
    height:'50%'
  }
}
function CommentModal({ post, user }) {
  // console.log(user.userId)
  const [open, setOpen] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const handleOpen = () => { setOpen(user.userId); }
  const handleClose = () => setOpen(null);
  const handleClick = async () => {
    console.log(comment);
    let commentid = await database.comments.add({
      comment: comment,
      user: user.userId,
      userName: user.fullName,
      post: post.pId,
      createdAt: database.getTimeStamp()
    })

    await database.posts.doc(post.pId).update({
      comments: [...post.comments, commentid.id]
    })
    setComment('');
  }

  return (
    <div className="commentcont" >
      <CommentIcon onClick={handleOpen}></CommentIcon>
      <Modal
        open={user.userId == open}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <Box sx={style}>
          <Box sx={hWidth}><video src={post.pUrl} autoPlay loop></video></Box>
          <Box sx={Wwidth}>
            <div className="comeentRight">
              <div className="apicomments">
                <Comment user={user} post={post}></Comment>
              </div>
              <div className="likecommentcont">
                <div className="likecomment">
                  <CommentLike user={user} post={post}></CommentLike>
                  <TextField sx={{ width: '100%', pl: 1, pr: 1 }} onChange={(e) => setComment(e.target.value)} value={comment} id="outlined-basic" label="Type comment here..." size='small' variant="outlined" />
                  <Button variant="outlined" onClick={handleClick}>POST</Button>
                </div>
                <div className="text">{post.likes.length} likes</div>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>

    </div>
  )
}

export default CommentModal
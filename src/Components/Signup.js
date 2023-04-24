import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import logo from '../images/logo-big.PNG'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import phone from '../images/phone.PNG'
import img1 from '../images/screenshot1.png'
import img2 from '../images/screenshot2.png'
import img3 from '../images/screenshot3.png'
import img4 from '../images/screenshot4.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase';
import { database } from '../firebase';



export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const history = useNavigate();
  const { signup } = React.useContext(AuthContext);

  let handleClick = async () => {
    try {
      setLoading(true);
      setError('');
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      console.log(uid);

      database.users.doc(uid).set({
        email: email,
        userId: uid,
        fullName: name,
        profileUrl: null,
        timestamp: database.getTimeStamp()
      })

      // database.users.doc(uid).update({
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
      // });

      // let uploadTask = storage.ref(`user/${uid}/name`).put(name);
      // uploadTask.on('state_changed', fn1, fn2, fn3);
      // function fn1(snapshot) {
      //   let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(`upload ${progress} done`);
      // }
      // function fn2(err) {
      //   console.log(err);
      //   setError(err.code);
      //   setTimeout(() => setError(''), 2000);
      //   setLoading(false);
      //   return;
      // }
      // async function fn3() {
      //   let url = await uploadTask.ref.getDownloadURL();
      //   console.log(url);
      //   database.users.doc(uid).set({
      //     email: email,
      //     userId: uid,
      //     fullName: name,
      //     profileUrl: url,
      //     createdAt: database.getTimeStamp()
      //   })
      //   setLoading(false);
      // }
      setLoading(false);
      history('/');
      // console.log('created obj')
      // console.log(userObj);
    }
    catch (err) {
      console.log(err)
      setError(err.code);
      setTimeout(() => { setError('') }, 2000);
      setLoading(false);
    }
  }
  return (
    <div className="signupwrapper">
      <div className="phone">
        <div className="phoneimage">
          <Carousel swipeable={false} animationHandler='fade' className='carousel' emulateTouch={false} showStatus={false} showIndicators={false} showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={false}>
            <div>
              <img src={img4} />
            </div>
            <div>
              <img src={img2} />
            </div>
            <div>
              <img src={img3} />
            </div>
          </Carousel>
        </div>
      </div>


      <div className="signupcard" style={{ marginTop: '2rem' }}>
        <Card variant='outlined' sx={{ p: 2 }}>
          <div className="logo" style={{ paddingBottom: 0 }}>
            <img src={logo} alt="" />
          </div>
          <CardContent>
            <Typography align='center' sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', texAlign: 'center', color: 'gray', fontSize: 17 }}>
              Sign up to see photos and videos from your friends.
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField fullWidth label="Mobile Number or Email" id="fullWidth" margin='dense' size='small' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <TextField fullWidth label="Full Name" id="fullWidth" margin='dense' size='small' value={name} onChange={(e) => { setName(e.target.value) }} />
            <TextField fullWidth label="Username" id="fullWidth" margin='dense' size='small' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            <TextField fullWidth   type="password" label="Password" id="fullWidth" margin='dense' size='small' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <Typography className='tnc' sx={{ fontSize: 12, m: 1, mt: 2 }}>
              People who use our service may have uploaded your contact information to Instagram. Learn More
            </Typography>
            <Typography className='tnc' sx={{ fontSize: 12, m: 1 }}>
              By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
            </Typography>
            <Button sx={{}} variant="contained" size='small' disabled={loading} onClick={handleClick} fullWidth={true} margin='dense' >Sign up</Button>

          </CardContent>
        </Card>

        <Card variant='outlined' sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: '14px', display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
            Have an account?<Link style={{ textDecoration: 'none' }} to={'/login'} >Log in</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
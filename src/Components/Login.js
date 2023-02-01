import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import logo from '../images/logo-big.PNG'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import phone from '../images/phone.PNG'
import img1 from '../images/screenshot1.png'
import img2 from '../images/screenshot2.png'
import img3 from '../images/screenshot3.png'
import img4 from '../images/screenshot4.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';
import Signup from './Signup';

// import { makeStyles } from ' @mui/styles';


export default function Login() {
  let data = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const history = useNavigate();

  // console.log('render');

  let handleClick = async()=>{
    try{
      setLoading(true);
      let userObj = await login(email, password);
      let uid = userObj.user.uid;
      history.push('./');
    }
    catch(err){
      console.log(err);
      setError(err);
      setTimeout(()=>{setError('')}, 2000);
      setLoading(false);
    }
  }
  return (
    
    <div className="signupwrapper">
      <div className="phone" style={{marginTop:'4rem'}}>
        <div className="phoneimage">
          <Carousel swipeable={false} animationHandler='fade' className='carousel' emulateTouch={false}  showStatus={false} showIndicators={false} showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={false}>
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


      <div className="signupcard" style={{marginTop:'0rem'}}>
        <Card variant='outlined' sx={{p:2, pb:0}}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <CardContent>

            {
              error && <Alert sx={{fontSize:13}} severity="error">This is an error alert — check it out!</Alert>
            }
            <TextField fullWidth label="Phone number, username or email" id="fullWidth" margin='dense' size='small' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <TextField fullWidth label="Password" id="fullWidth" margin='dense' size='small' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <Button sx={{ mt: 2, mb:2 }} disabled={loading} variant="contained" size='small' fullWidth={true} margin='dense' onClick={handleClick} >Log in</Button>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}><Link style={{textDecoration:'none', fontSize:'12px'}} to={'/login'} >Forgot password ?</Link></Box>
          </CardContent>
        </Card>
        <Card variant='outlined' sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: '14px', display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
            Dont have an account?<Link style={{textDecoration:'none'}} to={'/signup'} >Sign up</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
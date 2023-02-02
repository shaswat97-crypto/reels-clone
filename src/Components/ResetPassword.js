import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import logo from '../images/logo-big.PNG'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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


export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate();

  let handleClick = async () => {
    try {
      setLoading(true);
      setError('');
      let userObj = await auth.sendPasswordResetEmail(email);
      setMailSent(true);
      setTimeout(()=>{setMailSent(false)}, 2000);
      setLoading(false);
      // history('/');
      // console.log('created obj')
      // console.log(userObj);
    }
    catch (err) {
      // console.log(err.code)
      setError(err.code);
      setTimeout(() => { setError('') }, 2000);
      setLoading(false);
    }
  }
  return (
    <div className="signupwrapper">
      <div className="signupcard" style={{ marginTop: '6rem' }}>
        <Card variant='outlined' sx={{ p: 2 }}>
          <div className="logo" style={{ paddingBottom: 0 }}>
            <img src={logo} alt="" />
          </div>
          <CardContent sx={{}}>
            <Typography align='center' sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', texAlign: 'center', color: 'gray', fontSize: 14 }}>
              Enter your email, phone, or username and we'll send you a link to get back into your account.
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {mailSent && <Alert severity="success">Email sent successfully</Alert>}
            <TextField fullWidth label="Mobile Number or Email" id="fullWidth" margin='dense' size='small' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <Button sx={{ mt: 2 }} variant="contained" size='small' disabled={loading} onClick={handleClick} fullWidth={true} margin='dense' >Send Login Link</Button>
            <Typography align='center' sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', texAlign: 'center', color: 'gray', fontSize: 14 }}>
              OR
            </Typography>
            <Typography align='center' sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', texAlign: 'center', color: 'gray', fontSize: 14 }}>
              <Link style={{ textDecoration: 'none', color:'black' }} to={'/signup'} >Create new account</Link>
            </Typography>
          </CardContent>
        </Card>

        <Card variant='outlined' sx={{}}>
          <Typography sx={{ fontSize: '14px', display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
            <Link style={{ textDecoration: 'none', color:'black' }} to={'/login'} >Back to Log in</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
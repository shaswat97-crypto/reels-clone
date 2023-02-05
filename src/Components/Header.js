import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../images/logo-big.PNG'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'
import { useContext, useState, useEffect } from 'react'
import { createTheme, minHeight } from '@mui/system';

const style = {
  color: 'black',
  fontSize: '2.5rem',
  padding: '4px',
  cursor:'pointer'
}
const hStyle = {
  border:'none',
  backgroundColor:'white',
  margin:'0',
  alignItems:'center',
  minHeight:'10px'
}
const settings = ['Profile', 'Logout'];

function Header(props) {
  // console.log(props);
  let databaseUser = props.user;
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProfile = () =>{
    // console.log(user);
    navigate(`/profile/${user.uid}`)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //   D:\reels-clone\src\images\logo-big.PNG
  return (
    <AppBar sx={hStyle} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div><img onClick={()=>{databaseUser?navigate('/'):navigate('/login')}} src={logo} className='logoHeader' alt="" /></div>
          <Box sx={{ width: '90%' }}></Box>
          <Box sx={{ display: 'flex' }}>
            <HomeIcon onClick={()=>{databaseUser?navigate('/'):navigate('/login')}} sx={style}></HomeIcon>
            <Link to={'https://github.com/shaswat97-crypto'}><ExploreIcon sx={style}></ExploreIcon></Link> 
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{marginLeft:1, height:'28px', width:'28px'}} alt={user.email} src={databaseUser&&databaseUser.profileUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography onClick={handleProfile} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
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
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'
import { useContext, useState, useEffect } from 'react'

const style = {
  color: 'black',
  fontSize: '2.5rem',
  padding: '4px'
}
const hStyle = {
  border:'none',
  backgroundColor:'white',
  margin:'0',
  alignItems:'center'
}
const settings = ['Profile', 'Logout'];


function Header() {
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
          <div><img src={logo} alt="" /></div>
          <Box sx={{ width: '90%' }}></Box>
          <Box sx={{ display: 'flex' }}>
            <HomeIcon sx={style}></HomeIcon>
            <ExploreIcon sx={style}></ExploreIcon>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{marginLeft:1}} alt={user.email} src="/static/images/avatar/2.jpg" />
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
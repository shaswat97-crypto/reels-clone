import { useContext, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Explore as ExploreIcon,
  Send as SendIcon,
  Notifications as NotificationsIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Person as PersonIcon,
  Upload,
  LogoutOutlined,
} from "@mui/icons-material";
import logo from "../images/logo-big.PNG";
import { useNavigate, Link } from "react-router-dom";
import Messages from "./Messages";
import a from "./messages.css";
import q from "./notifications.css";

import "./sidebar.css";
import UploadFile from "./UploadFile";
import Notifications from "./Notifications";
import { AuthContext } from "../Context/AuthContext";

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  // console.log(user);
  const handleProfile = (e) => {
    e.preventDefault();
    navigate(`/profile/${user.userId}`);
  };
  const toggleSearchDrawer = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleMessagesDrawer = () => {
    setIsMessagesOpen((prev) => !prev);
  };

  const toggleNotificationsDrawer = () => {
    setIsNotificationsOpen((prev) => !prev);
  };
  const handleLogout = async() => {
    await logout();
    navigate('/login');
  };
  return (
    <div className="s-main">
      <Box sx={{ flexGrow: 1 }}>
        {/* <Toolbar /> */}
        <List>
          <ListItem
            sx={{
              cursor: "pointer",
              mb: 2,
              width: "100%",
            }}
            onClick={() => {
              user ? navigate("/") : navigate("/login");
            }}
          >
            <ListItemIcon>
              <div>
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.edigitalagency.com.au%2Fwp-content%2Fuploads%2Finstagram-logo-text-black-png.png&f=1&nofb=1&ipt=cd7b9347eb889a8822b6d87ae4971e5425f6e41b0678d8a289300235d380fe78&ipo=images"
                  style={{ width: "180px" }}
                  alt=""
                />
              </div>
            </ListItemIcon>
          </ListItem>
          <ListItem
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
          >
            <ListItemIcon>
              <HomeIcon sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            onClick={() => navigate("/explore")}
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
          >
            <ListItemIcon>
              <ExploreIcon sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem>
          <ListItem
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
          >
            <ListItemAvatar>
              <UploadFile user={user} />
            </ListItemAvatar>
          </ListItem>
          <ListItem
            onClick={toggleMessagesDrawer}
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
          >
            <ListItemIcon>
              <SendIcon sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
            onClick={toggleNotificationsDrawer}
          >
            <ListItemIcon>
              <NotificationsIcon sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutOutlined sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
              mb: 1,
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
            onClick={toggleSearchDrawer}
          >
            <ListItemIcon>
              <SearchIcon sx={{ fontSize: "33px" }} />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem
            onClick={handleProfile}
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
                cursor: "pointer",
              },
            }}
            onMouseEnter={(e) =>
              e.currentTarget.querySelector("svg").classList.add("icon-hover")
            }
            onMouseLeave={(e) =>
              e.currentTarget
                .querySelector("svg")
                .classList.remove("icon-hover")
            }
          >
            <ListItemIcon>
              <Avatar
                sx={{ height: "35px", width: "35px" }}
                alt={user && user.email}
                src={user && user.profileUrl}
              />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
      </Box>
      <Drawer
        anchor="left"
        open={isSearchOpen}
        onClose={toggleSearchDrawer}
        sx={{ "& .MuiDrawer-paper": { width: "30vw", height: "100%" } }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <input type="text" placeholder="Search" className="search-bar" />
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        open={isNotificationsOpen}
        onClose={toggleNotificationsDrawer}
        sx={{ "& .MuiDrawer-paper": { width: "30vw", height: "100%" } }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <Notifications />
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        open={isMessagesOpen}
        onClose={toggleMessagesDrawer}
        sx={{ "& .MuiDrawer-paper": { width: "30vw", height: "100%" } }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <Messages />
        </Box>
      </Drawer>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import logo from "../assets/images/swamedia.png";
import { useNavigate, useLocation } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton, Divider } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";

import home from "../assets/images/home.png";
import profpic from "../assets/images/user-default.png";
import prospek from "../assets/images/prospek.png";
import invoice from "../assets/images/invoice.png";
import target from "../assets/images/target-ex.png";

import "../assets/css/header.css";


function Header() {
  const navigate = useNavigate();

  const routes = useLocation();
  const [clock, setClock] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [menus, setMenus] = useState([
    { label: "Dashboard", icon: home, link: "/dashboard" },
    { label: "Customer", icon: prospek, link: "/customer" },
    { label: "Sales", icon: invoice, link: "/sales" },
    { label: "Target & Existing", icon: target, link: "/sales-target" }
  ]);

  const {
    state,
    getBasicUserInfo,
    getAccessToken
  } = useAuthContext();
  useEffect(() => {
    console.log(state);
    if (state?.isAuthenticated) {
      if (!photoUrl) {
        getBasicUserInfo().then((response) => {
          setPhotoUrl(response.picture)
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
      }

    }
  }, [state.isAuthenticated, getBasicUserInfo, photoUrl])
  useEffect(() => {
    //running the api call on first render/refresh
    startTime();
    //running the api call every one minute
    const interval = setInterval(() => {
      startTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    getAccessToken()
      .then((token) => {
        console.log("getAccessToken loaded " + new Date().getHours() + ":" + new Date().getMinutes());
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.error("Unexpected error ex:", error);
      });
  }, [getAccessToken])

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  function startTime() {
    const today = new Date();
    let d = today.getDate();
    let month = today.toLocaleString("default", { month: "short" });
    let year = today.getFullYear();
    let nameofday = today.toLocaleString("en-us", { weekday: "long" });
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    setClock(
      nameofday +
      ", " +
      (d <= 9 ? "0" + d : d) +
      " " +
      month +
      " " +
      year +
      " " +
      h +
      ":" +
      m +
      ":" +
      s
    );
  }

  const [open, setOpen] = useState(false);

  const { signOut, on } = useAuthContext();



  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopup = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div id="header">
      <nav>
        <div className="container">
          <div className="left-header-dash">
            <div className="menu-btn" >
              <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setOpen(open === true ? false : true)}>
                menu_open
              </span>
            </div>
            <img src={logo} alt="logo" className="logo" />
            <label className="tittle-header-dashboard">Sales Dashboard</label>
          </div>
          <div className="right-header-dash">
            <div>
              <div style={{margin:"13x"}}>
                <IconButton
                  aria-controls={openPopup ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openPopup ? "true" : undefined}
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  className="profile"
                >
                  <img src={photoUrl ? photoUrl : profpic} alt="Avatar" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openPopup}
                  onClose={handleClose}
                  onClick={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem sx={[{ '&:hover': { backgroundColor: 'transparent' } }]} >
                    <div className="profile-name">
                      <label >{state.displayName}</label>
                      <label className="profile-name-2" >{state.email}</label>
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      on("sign-out", () => {
                        localStorage.clear();
                        navigate("/login");
                      });
                      signOut();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <label className="profile-name">Logout</label>
                  </MenuItem>
                </Menu>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div
          className={
            open ? "left-sidebar menu-mobile-nav-dash" : "left-sidebar"
          }
        >
          <ul>
            <div
              className="menu-mobile-close"
              onClick={() => setOpen(open === true ? false : true)}
            >
              <span className="material-icons-sharp"> close </span>
            </div>
            {menus.map((val, index) => {
              return (
                <li
                  key={`key-menu-${index}`}
                  onClick={(_) => {
                    navigate(val.link);
                  }}
                  className={
                    val.link === "/" + routes.pathname.split("/")[1]
                      ? "active-menu"
                      : ""
                  }
                >
                  <img src={val.icon} alt="" />
                  {val.label}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <div className="clock" id="clock-txt">
        {clock}
      </div>
    </div>
  );
}

export default Header;

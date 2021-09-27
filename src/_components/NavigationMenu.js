import { elastic as Menu } from "react-burger-menu";
import "./Navigation.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, Typography, Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { LoginContext } from "../_helpers/Context";
import Cookies from "universal-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  menu: {
    position: "relative",
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: 10,
    width: "100% !important",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: "#EC645B",
      color: "white",
    },
    "&>a": {
      width: "100%",
    },
  },

  username: {
    // position: "absolute",
    marginTop: -5,
    marginRight: 30,
    fontSize: "0.8rem",
    color: "#F0EEEB",
    textAlign: "right",
    outline: "none",
  },
}));
const NavigationMenu = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const { auth, setAuth } = useContext(LoginContext);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  const removeCookie = (key) => {
    const cookies = new Cookies();
    cookies.remove(key);
    setAuth(null);
    setCurrentUser(null);
    history.push("/");
  };

  const logout = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: true,
    })
      .then((res) => {
        // console.log("logout response", res.data);
        removeCookie("jwt");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Menu className={classes.menu} right width={250}>
      {auth && (
        <Typography variant="subtitle1" className={classes.username}>
          Welcome, {auth?.username}
        </Typography>
      )}
      <Link to="/">
        <Typography className={classes.menuItem}>Home</Typography>
      </Link>

      <Divider light />
      {auth ? (
        <Link to="#">
          <Typography onClick={logout} className={classes.menuItem}>
            Logout
          </Typography>
        </Link>
      ) : (
        <Link to="/signin">
          <Typography className={classes.menuItem}>Sign In</Typography>
        </Link>
      )}
      <Divider light />
    </Menu>
  );
};

export default NavigationMenu;

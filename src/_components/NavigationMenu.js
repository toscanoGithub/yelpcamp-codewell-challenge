import { elastic as Menu } from "react-burger-menu";
import "./Navigation.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, Typography, Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { LoginContext } from "../_helpers/Context";
import Cookies from "js-cookie";
import axios from "axios"

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
      color: "black",
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
    Cookies.remove(key);

    setAuth(null);
    setCurrentUser(null);
    // history.push("/");
  };

  const logout = async () => {
    // await fetch(
    //   "https://yelpcamp-codewell-challenge.herokuapp.com/api/users/logout",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "Application/json" },
    //     credentials: "include",
    //   }
    // );

    // removeCookie("jwt");

axios({
  method: "GET",
  url: `${process.env.REACT_APP_API_URL}api/users/logout`,
  withCredentials: true,
})
  .then((res) => {
    console.log(res);
   removeCookie("jwt")
  })
  .catch((err) => {
    console.log(err);
  });




  };

  useEffect(() => {
    (async function () {
      if (!auth) return;
      fetch(
        `https://yelpcamp-codewell-challenge.herokuapp.com/api/users/${auth}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    })();
  }, [auth]);
  return (
    <Menu className={classes.menu} right width={250}>
      {currentUser && (
        <Typography variant="subtitle1" className={classes.username}>
          {currentUser.username}
        </Typography>
      )}
      <Link to="/">
        <Typography className={classes.menuItem}>Home</Typography>
      </Link>

      <Divider light />
      {currentUser ? (
        <Link to="/">
          <Typography onClick={logout} className={classes.menuItem}>
            Logout
          </Typography>
        </Link>
      ) : (
        <Link to="/signup">
          <Typography className={classes.menuItem}>Sign Up</Typography>
        </Link>
      )}
      <Divider light />
    </Menu>
  );
};

export default NavigationMenu;

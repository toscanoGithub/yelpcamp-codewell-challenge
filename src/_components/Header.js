import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import NavigationMenu from "../_components/NavigationMenu";
import logo from "../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../_helpers/Context";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 70,
  },

  header: {
    width: "100%",
    padding: "0 5%",
    position: "absolute",
    top: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  links: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingLeft: 20,
    marginTop: 5,
    "&>a": {
      color: "black",
      transition: "all 0.25s ease",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  info: {
    display: "flex",
    justifyContent: "space-between",

    "&>a": {
      marginLeft: 10,
      color: "black",
      transition: "all 0.25s ease",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },

    "&>button": {
      marginLeft: 20,
      padding: 10,
      marginTop: -10,
      backgroundColor: "black",
      color: "white",
      textTransform: "capitalize",
      "&:hover": {
        opacity: 0.8,
        backgroundColor: "black",
        color: "white",
      },
    },
  },
}));
function Header() {
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
    removeCookie("jwt");
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log("logout response", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    (async function () {
      if (!auth) return;
      await fetch(`${process.env.REACT_APP_API_URL}api/users/${auth}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
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
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={logo} alt="logo" className={classes.logo} />
        <div className={classes.links}>
          <Link className={classes.homeLink} to="/">
            <Typography variant="subtitle1">Home</Typography>
          </Link>
          {currentUser ? (
            <div className={classes.info}>
              <Typography variant="subtitle1">
                {currentUser?.username}
              </Typography>
              <Button onClick={logout} className={classes.logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={classes.info}>
              <Link className={classes.login} to="/signin">
                <Typography variant="subtitle1">Login</Typography>
              </Link>
              <Button
                onClick={() => history.push("/signup")}
                disableElevation
                className={classes.signUp}
                variant="contained"
              >
                Create an account
              </Button>
            </div>
          )}
        </div>
        <NavigationMenu className={classes.navMenu}></NavigationMenu>
      </div>
    </div>
  );
}

export default Header;

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

import heroImage from "../assets/hero-image.jpg";
import heroImageSmall from "../assets/hero-image-tablet-mobile.jpg";
import checkmark from "../assets/checkmark.svg";
import logo from "../assets/logo.svg";
import airbnb from "../assets/airbnb.svg";
import booking from "../assets/booking.svg";
import plum from "../assets/plum-guide.svg";

import { useContext, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router";
import { LoginContext } from "../_helpers/Context";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "row-reverse",
    },
  },
  logo: {
    position: "absolute",
    left: 100,
    top: 15,

    [theme.breakpoints.down("sm")]: {
      left: 25,
    },
  },

  landingImage: {
    // height: "100%",
    objectFit: "cover",
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${heroImageSmall})`,
      width: "100%",
      height: "50vh",
      objectFit: "cover",
      marginTop: 60,
    },
  },

  textSide: {
    paddingLeft: 100,
    alignSelf: "center",
    justifySelf: "center",

    [theme.breakpoints.down("sm")]: {
      paddingLeft: 30,
    },

    "&>h1": {
      fontWeight: 700,
      fontSize: "2rem",
      margin: "10px 0",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.3rem",
        margin: "30px 0 10px 0",
      },
    },

    "&>button": {
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: "black",
      color: "white",
      textTransform: "Capitalize",
      padding: 10,
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        opacity: 0.9,
      },
    },
  },

  list: {
    margin: "10px auto",
  },

  item: {
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    "&>img": {
      marginRight: 10,
    },
  },

  parteners: {
    display: "flex",
    alignItems: "center",

    "&>img": {
      width: 100,
      objectFit: "cover",
    },
  },
}));
function Landing() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  const history = useHistory();
  const { auth, setAuth } = useContext(LoginContext);

  useEffect(() => {
    (async function () {
      // await fetch(`https://yelpcamp-codewell-challenge.herokuapp.com/user`, {
      //   method: "GET", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "include", // include, *same-origin, omit
      //   headers: {
      //     "Content-Type": "application/json",
      //     "access-control-allow-origin": "*",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setAuth(data._id);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });

      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}user`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            console.log("APP res.data.errors");
          } else {
            console.log("APP res.data", res.data);
            setAuth(res.data._id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Grid
      direction={`${matches ? "row-reverse" : "column-reverse"}`}
      className={classes.root}
      container
    >
      <img src={logo} alt="logo" className={classes.logo} />
      <Grid className={classes.landingImage} item sm={12} md={5}></Grid>

      <Grid className={classes.textSide} item xs={12} md={7}>
        <Typography variant="h1">Explore the best camps on Earth.</Typography>
        <Typography variant="subtitle1">
          YelpCamp is a curated list of the best camping spots on Earth.
          Unfiltered and unbiased reviews.
        </Typography>

        <div className={classes.list}>
          <div className={classes.item}>
            <img src={checkmark} alt="checkmark" />
            <Typography variant="subtitle1">
              Add your own camp suggestions.
            </Typography>
          </div>
          <div className={classes.item}>
            <img src={checkmark} alt="checkmark" />
            <Typography variant="subtitle1">
              Add your own camp suggestions.
            </Typography>
          </div>
          <div className={classes.item}>
            <img src={checkmark} alt="checkmark" />
            <Typography variant="subtitle1">
              Add your own camp suggestions.
            </Typography>
          </div>
        </div>
        <Button
          onClick={() =>
            auth ? history.push("/search") : history.push("/signin")
          }
          disableElevation
          variant="contained"
        >
          View CampGrounds
        </Button>

        <div>
          <Typography variant="subtitle1">Partenered with:</Typography>
          <div className={classes.parteners}>
            <img src={airbnb} alt="airbnb" />
            <img src={booking} alt="airbnb" />
            <img src={plum} alt="airbnb" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Landing;

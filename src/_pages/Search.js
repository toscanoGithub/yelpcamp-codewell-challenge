import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { CampgroundsContext, LoginContext } from "../_helpers/Context";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CampCard from "../_components/CampCard";
import { featuredCamps } from "../data/featured.camps";
import Header from "../_components/Header";
import axios from "axios";
import Spinner from "../_components//Spinner";

const useStyles = makeStyles((theme) => ({
  root: {},

  searchBox: {
    marginTop: 100,
    backgroundColor: "#F9F6F1",
    maxWidth: "90%",
    margin: "0 auto",
    padding: 30,
    "&>h1": {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: 10,
      color: "#F13434",
    },

    "&>h6": {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#1D2136",
    },

    "&>a": {
      color: "black",
      textDecoration: "underline !important",
    },
  },

  boxInput: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginRight: 0,
    },
    margin: "10px 0",
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid #ccc",
    backgroundColor: "white",
    width: 220,
    padding: 10,

    "&>input": {
      border: "none",
      outline: "none",
      height: "100%",
    },
  },

  userInput: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",

      "&>button": {
        width: "100%",
      },
    },

    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    "&>button": {
      color: "white !important",
      minWidth: 100,
      padding: 10,
      backgroundColor: "black",
      textTransform: "capitalize",

      "&:hover": {
        backgroundColor: "black",
        color: "white",
        opacity: 0.8,
      },
    },
  },

  addLink: {
    color: "black",
    textDecoration: "underline !important",
  },

  cards: {
    width: "90%",
    margin: "0 auto",
  },

  spinnerWrapper: {
    marginTop: 50,
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
}));
function Search() {
  const classes = useStyles();
  const { auth, setAuth } = useContext(LoginContext);
  const history = useHistory();

  const { campgrounds, setCampgrounds } = useContext(CampgroundsContext);
  const [filteredCampgrounds, setFilteredCampgrounds] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const searchCampground = (e) => {
    e.preventDefault();
    setFilteredCampgrounds(
      campgrounds.filter((c) => {
        return c.title?.toLowerCase() === searchTerm.toLowerCase();
      })
    );
    
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
    if (searchTerm === "") return;
    setFilteredCampgrounds((f) =>
      campgrounds.filter((camp) =>
        camp.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    );
  };
  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.searchBox}>
        <Typography variant="h1">Welcome to YelpCamp</Typography>
        <Typography variant="subtitle1">
          View our hand-picked campgrounds from all over the world, or add your
          own.
        </Typography>

        <div className={classes.userInput}>
          <div className={classes.boxInput}>
            <SearchIcon />
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search for camps"
            />
          </div>
          <Button onClick={searchCampground}>Search</Button>
        </div>
        <Typography
          onClick={() =>
            `${
              auth ? history.push("/add/campground") : history.push("/signin")
            }`
          }
          variant="subtitle1"
          component={Link}
          to="#"
        >
          Or add your own campgrounds.
        </Typography>
      </div>
      <div className={classes.spinnerWrapper}>
        <Spinner
          className={classes.spinner}
          loading={!campgrounds || campgrounds?.length === 0}
        />
      </div>
      <Grid container spacing={3} className={classes.cards}>
        {campgrounds
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((campCard) => {
            return (
              <Grid key={campCard._id} item xs={12} sm={6} md={4}>
                <CampCard {...campCard} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

{
}

/* <Grid key={campCard._id} item xs={12} sm={6} md={4}>
  <CampCard {...campCard} />
</Grid>; */
export default Search;

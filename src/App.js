import { makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import AddNewCampground from "./_pages/AddNewCampground";
import IndividualCampground from "./_pages/IndividualCampground";
import Landing from "./_pages/Landing";
import Search from "./_pages/Search";
import SignIn from "./_pages/SignIn";
import SignUp from "./_pages/SignUp";
import { CampgroundsContext, LoginContext } from "./_helpers/Context";
import { useEffect, useLayoutEffect, useState } from "react";
import AddNewComment from "./_pages/AddNewComment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState();
  const [campgrounds, setCampgrounds] = useState([]);

  useLayoutEffect(() => {
    (async function () {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/campgrounds`,
        withCredentials: true,
      })
        .then((res) => {
          setCampgrounds(res.data.campgrounds);
        })
        .catch((err) => {
          console.log(err.message);
          return [];
        });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}user`,
        withCredentials: true,
        headers: {
          "access-control-allow-origin": "*",
        },
      })
        .then((res) => {
          if (res.data.errors) {
            // console.log("Landing res.data.errors");
          } else {
            // console.log("App res.data", res.data);
            setAuth(res.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, []);
  return (
    <CampgroundsContext.Provider value={{ campgrounds, setCampgrounds }}>
      <LoginContext.Provider value={{ auth, setAuth }} className={classes.root}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/search" component={Search} />
          <Route path="/individual/:id" component={IndividualCampground} />
          <Route path="/add/campground" component={AddNewCampground} />
          <Route path="/add/comment/:id" component={AddNewComment} />

          <Route exact path="/" component={Landing} />
        </Switch>
      </LoginContext.Provider>
    </CampgroundsContext.Provider>
  );
}

export default App;

import { makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import AddNewCampground from "./_pages/AddNewCampground";
import IndividualCampground from "./_pages/IndividualCampground";
import Landing from "./_pages/Landing";
import Search from "./_pages/Search";
import SignIn from "./_pages/SignIn";
import SignUp from "./_pages/SignUp";
import { LoginContext } from "./_helpers/Context";
import { useEffect, useState } from "react";
import AddNewComment from "./_pages/AddNewComment";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState();

  useEffect(() => {
    (async function () {
      await fetch(`https://yelpcamp-codewell-challenge.herokuapp.com/user`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "*same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAuth(data._id);
        })
        .catch((error) => {
          console.log(error.message);
        });
    })();
  }, [auth]);
  return (
    <LoginContext.Provider value={{ auth, setAuth }} className={classes.root}>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/search" component={Search} />
        <Route path="/individual/:id" component={IndividualCampground} />
        <Route path="/add/campground" component={AddNewCampground} />
        <Route path="/add/comment" component={AddNewComment} />

        <Route exact path="/" component={Landing} />
      </Switch>
    </LoginContext.Provider>
  );
}

export default App;

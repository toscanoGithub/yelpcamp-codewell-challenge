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
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState();

  useEffect(() => {
    (async function () {
      await axios({
        method: "GET",
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
          console.log(err.message);
        });
    })();
  }, []);
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

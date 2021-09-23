import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

import testimonial from "../assets/user-testimonial.svg";
import logo from "../assets/logo.svg";

import { useContext, useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { Form, Formik } from "formik";
import TextInput from "../_components/TextInput";
import * as Yup from "yup";

import Spinner from "../_components/Spinner";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { LoginContext } from "../_helpers/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  // testimonial container >> review and profile
  container: {
    maxWidth: 300,
    "&>h4": {
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 2,
    },
  },

  textSide: {
    padding: "10px 10%",
    justifySelf: "center",
  },

  logoBack: {
    justifySelf: "flex-start",
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&>a": {
      display: "flex",
      alignItems: "center",
    },
  },

  back: {
    fontWeight: 700,
    fontSize: "0.9rem !important",
    color: "#464866",
  },

  formWrapper: {
    width: "100%",
    padding: 10,
    marginTop: "15vh",
    height: "45vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      marginBottom: 100,
    },

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: "10vh",
    },
    "&>h1": {
      fontWeight: 700,
      fontSize: "1.5rem",
      textTransform: "capitalize",
      textAlign: "center",
      padding: 10,
    },
  },

  alreadyUserWrapper: {
    marginTop: 10,
    display: "flex",
    "&>a": {
      color: "#51CDF6",
      marginLeft: 10,
      textDecoration: "underline !important",
      fontWeight: 600,
    },
  },

  inputs: {
    "&>button": {
      backgroundColor: "black",
      color: "white",
      textTransform: "capitalize",
      padding: 10,
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        opacity: 0.8,
      },
    },
  },

  testimonial: {
    width: "100%",
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      minHeight: 300,
    },
    backgroundColor: "#F9F6F1",
    display: "grid",
    placeItems: "center",
  },
  profile: {
    marginTop: 10,
    justifySelf: "flex-start",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
  },

  userInfo: {
    marginLeft: 10,
    "&>h5": {
      fontWeight: 700,
      fontSize: "0.8rem",
    },
  },

  errors: {
    color: "white",
    backgroundColor: "#F13434",
    textAlign: "center",
    padding: 5,
    margin: "3px auto",
  },
}));
function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState(null);
  const { auth, setAuth } = useContext(LoginContext);
  const handleChange = (event) => {
    setState((previous) => !previous);
  };

  const validate = Yup.object({
    username: Yup.string()
      .max(9, "Must be 9 characters or less")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.textSide} item xs={12} md={7}>
        <div className={classes.logoBack}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Link to="/">
            <KeyboardBackspaceIcon color="secondary" />
            <Typography className={classes.back} variant="h5">
              Campgrounds
            </Typography>
          </Link>
        </div>

        <div className={classes.formWrapper}>
          <Typography variant="h1">
            Start exploring camps from all around the world.
          </Typography>
          {/* Formik */}
          <div style={{ width: "100%" }}>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={async (values, formik) => {
                console.log("+++++++++ Form Data +++++++++", values);

                await fetch(
                  "https://yelpcamp-codewell-challenge.herokuapp.com/api/users/register",
                  {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "include", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      "access-control-allow-origin": "*",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ ...values }),
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.errors) {
                      setErrors(data.errors);
                      setTimeout(() => {
                        setErrors(null);
                      }, 3000);
                    } else {
                      formik.resetForm();
                      setAuth(data.user);
                      history.push("/search");
                    }
                  })
                  .catch((error) =>
                    console.log("Failed to register", error.message)
                  );
              }}
            >
              {(formik) => {
                return (
                  <div className={classes.root}>
                    <Spinner loading={showSpinner} />

                    {errors && (
                      <Typography
                        variant="subtitle1"
                        className={classes.errors}
                      >
                        {errors.error || errors.username || errors.password}
                      </Typography>
                    )}
                    <Form className={classes.form}>
                      <div className={classes.inputs}>
                        {!state && (
                          <TextInput
                            placeholder="johndoe_91"
                            label="Username"
                            name="username"
                            type="text"
                            emoji=""
                          />
                        )}

                        <TextInput
                          placeholder="Choose Password"
                          label="Password"
                          name="password"
                          type="password"
                          emoji=""
                        />

                        <Button
                          fullWidth
                          type="submit"
                          fullWidth
                          variant="contained"
                        >
                          Create an account
                        </Button>
                      </div>
                      <div className={classes.alreadyUserWrapper}>
                        <Typography
                          className={classes.alreadyText}
                          variant="subtitle1"
                        >
                          Already a user?
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to="/signin"
                        >
                          Sign in
                        </Typography>
                      </div>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          </div>
          {/* Formik END */}
        </div>
      </Grid>
      <Grid className={classes.testimonial} item sm={12} md={5}>
        <div className={classes.container}>
          <Typography variant="h4">
            "YelpCamp, has honestly saved me hours of research time, and the
            camps on here are definitely well picked and added."
          </Typography>
          <div className={classes.profile}>
            <Avatar alt="" src={testimonial} sx={{ width: 24, height: 24 }} />

            <div className={classes.userInfo}>
              <Typography variant="h5">May Andrews</Typography>
              <Typography variant="subtitle1">Professional Hiker</Typography>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp;

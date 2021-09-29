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
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { Form, Formik } from "formik";
import TextInput from "../_components/TextInput";
import * as Yup from "yup";

import Spinner from "../_components/Spinner";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Header from "../_components/Header";
import { LoginContext } from "../_helpers/Context";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "&>h1": {
      fontSize: "1.6rem",
      fontWeight: 700,
      textAlign: "center",
      paddingTop: 50,
      "&::after": {
        content: "''",
        paddingBottom: 10,
        borderBottom: "1px solid #ccc",
        display: "block",
        width: "100px",
        margin: "0 auto",
      },
    },
  },
  form: {
    margin: "30px auto",
    width: 600,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
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
}));
function AddNewComment() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState(null);
  const { auth, setAuth } = useContext(LoginContext);
  const { id } = useParams();
  const validate = Yup.object({
    comment: Yup.string().required("Comment is required"),
  });
  return (
    <div className={classes.root}>
      <Header />
      <Typography variant="h1">Add New Comment</Typography>
      <Grid container spacing={3} className={classes.form}>
        <Grid item xs={12} sm={6} md={6}>
          <Formik
            initialValues={{
              comment: "",
            }}
            validationSchema={validate}
            onSubmit={async (values, formik) => {
              // setShowSpinner(true);
              console.log("+++++++++ Form Data +++++++++", values, id, auth);
              await axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}api/campgrounds/review-campground/${id}`,
                withCredentials: true,

                data: {
                  ...values,
                  id: auth._id,
                  username: auth.username,
                },
              })
                .then((res) => {
                  // console.log("res.dada add review >>>>> ", res.data);
                  formik.resetForm();
                  console.log(`/individual/${id}`);
                  history.push(`/individual/${id}`);
                  // setAuth(res.data);
                  // history.push("/search");
                })
                .catch((err) => {
                  console.log("error on review camp>>>", err.message);
                });

              formik.resetForm();
            }}
          >
            {(formik) => {
              return (
                <div className={classes.root}>
                  {/* <Spinner loading={showSpinner} /> */}

                  {errors && (
                    <Typography variant="subtitle1" className={classes.errors}>
                      {errors.error}
                    </Typography>
                  )}
                  <Form className={classes.form}>
                    <div className={classes.inputs}>
                      <TextInput
                        mode="textarea"
                        placeholder="This was probably the best camp I've visited this past year, definitely recommend visiting any time soon."
                        label="Your Comment"
                        name="comment"
                        type="text"
                        emoji=""
                        multiline="true"
                      />

                      <Button
                        fullWidth
                        type="submit"
                        fullWidth
                        variant="contained"
                      >
                        Post Comment
                      </Button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddNewComment;

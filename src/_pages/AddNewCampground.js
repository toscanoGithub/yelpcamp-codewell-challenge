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
import Header from "../_components/Header";

import FileBase from "react-file-base64";
import axios from "axios";
import { CampgroundsContext, LoginContext } from "../_helpers/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    "&>h1": {
      fontSize: "1.6rem",
      fontWeight: 700,
      textAlign: "center",
      paddingTop: 30,
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
    margin: "10px auto",
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

  baseWrapper: {
    margin: "20px 0 10px 0",
  },
}));
function AddNewCampground() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState(null);
  const [image, setImage] = useState();
  const { campgrounds, setCampgrounds } = useContext(CampgroundsContext);
  const { auth, setAuth } = useContext(LoginContext);

  const validate = Yup.object({
    title: Yup.string().required("Campground name is required"),
    price: Yup.string().required("Campground price is required"),
    // image: Yup.string().required("Campground image is required"),
    description: Yup.string().required("Campground description is required"),
  });
  return (
    <div className={classes.root}>
      <Header />
      <Typography variant="h1">Add New Campground</Typography>
      <Grid container spacing={3} className={classes.form}>
        <Grid item xs={12} sm={6} md={6}>
          <Formik
            initialValues={{
              title: "",
              price: "",
              // image: "",
              description: "",
            }}
            validationSchema={validate}
            onSubmit={async (values, formik) => {
              // setShowSpinner(true);
              console.log("+++++++++ Form Data +++++++++", {
                ...values,
                image,
                auth,
              });
              await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/campgrounds`,
                withCredentials: true,
                data: { ...values, creator: auth, pic: image },
              })
                .then((res) => {
                  console.log("res.data", res.data);
                  setCampgrounds([res.data, ...campgrounds]);
                  history.push("/search");
                })
                .catch((err) => {
                  console.log(err.message);
                  return [];
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
                      {!state && (
                        <TextInput
                          placeholder="Seven Sisters Waterfall"
                          label="Campground Name"
                          name="title"
                          type="text"
                          emoji=""
                        />
                      )}

                      <TextInput
                        placeholder="$149"
                        label="Price"
                        name="price"
                        type="text"
                        emoji=""
                      />

                      {/* <TextInput
                        placeholder="https://www.planetware.com/wpimages/2020/08/canada-ontario-best-campgrounds-algonquin-provincial-park-fog.jpg"
                        label="Image"
                        name="image"
                        type="text"
                        emoji=""
                      /> */}

                      <div className={classes.baseWrapper}>
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            // setMemoryData({ ...memoryData, selectedFile: base64 })
                            setImage(base64)
                          }
                        />
                      </div>

                      <TextInput
                        mode="textarea"
                        placeholder="The Seven Sisters is the 39th waterfall in Norway. The 410-metre tall waterfall consists of seven separate streams, and the tallest of the seven has a free fall that measures 250 metres. The waterfall is located along the Geirangerfjorden in Stranda Municipality in Møre og Romsdal county, Norway."
                        label="Description"
                        name="description"
                        type="text"
                        emoji=""
                        multiline
                      />

                      <Button
                        fullWidth
                        type="submit"
                        fullWidth
                        variant="contained"
                      >
                        Add Campground
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

export default AddNewCampground;

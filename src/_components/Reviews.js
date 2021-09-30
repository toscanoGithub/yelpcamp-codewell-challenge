import { Button, Divider, makeStyles, Typography } from "@material-ui/core";
import { featuredReviews } from "../data/featured.reviews";
import chatIcon from "../assets/chat-bubble.svg";
import { useHistory } from "react-router";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../_helpers/Context";
import axios from "axios";
import Spinner from "./Spinner";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    padding: 10,
    marginTop: 30,

    "&>button": {
      placeSelf: "flex-end",
      [theme.breakpoints.down("md")]: {
        placeSelf: "flex-start",
      },

      color: "white",
      backgroundColor: "black",
      textTransform: "capitalize",

      "&:hover": {
        color: "white",
        backgroundColor: "black",
        opacity: 0.8,
      },

      "&>.MuiButton-label>img": {
        padding: 8,
      },
    },
  },

  spinner: {
    placeSelf: "center",
  },

  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&>h1": {
      fontWeight: 700,
      fontSize: "1rem",
    },
  },

  review: {
    placeSelf: "stretch",
    marginBottom: 10,
    "&>h6": {
      fontSize: "1rem",
    },
  },
}));
function Reviews({ campId }) {
  const classes = useStyles();
  const history = useHistory();
  const { auth, setAuth } = useContext(LoginContext);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    (async function () {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/campgrounds/reviews-for/${campId}`,
        withCredentials: true,
      })
        .then((res) => {
          console.log("res.dada from reviews for >>>>> ", campId, res.data);
          setReviews(res.data);
        })
        .catch((err) => {
          console.log("error on review camp>>>", err.message);
        });
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Spinner className={classes.spinner} loading={!reviews} />
      {reviews &&
        reviews.map((review) => (
          <div key={review.timestamp} className={classes.review}>
            <div className={classes.info}>
              <Typography variant="h1">{review.commenterPseudo}</Typography>
              <Typography variant="subtitle1">{review.timestamp}</Typography>
            </div>
            <Typography variant="subtitle1">{review.text}</Typography>
            <Divider style={{ marginTop: 10 }} light />
          </div>
        ))}
      <Button
        className={classes.reviewButton}
        onClick={() =>
          `${
            auth
              ? history.push(`/add/comment/${campId}`)
              : history.push("/signin")
          }`
        }
        disableElevation
        variant="contained"
      >
        <img src={chatIcon} alt="chat" /> Leave a review
      </Button>
    </div>
  );
}

export default Reviews;

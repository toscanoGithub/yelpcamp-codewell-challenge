import { Button, Divider, makeStyles, Typography } from "@material-ui/core";
import { featuredReviews } from "../data/featured.reviews";
import chatIcon from "../assets/chat-bubble.svg";
import { useHistory } from "react-router";
import { useContext } from "react";
import { LoginContext } from "../_helpers/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 10,
    marginTop: 30,

    "&>button": {
      margin: "20px auto",
      width: 200,
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
    marginBottom: 10,
    "&>h6": {
      fontSize: "1rem",
    },
  },
}));
function Reviews() {
  const classes = useStyles();
  const history = useHistory();
  const { auth, setAuth } = useContext(LoginContext);

  return (
    <div className={classes.root}>
      {featuredReviews &&
        featuredReviews.map((review) => (
          <div className={classes.review}>
            <div className={classes.info}>
              <Typography variant="h1">{review.username}</Typography>
              <Typography variant="subtitle1">{review.time}</Typography>
            </div>
            <Typography variant="subtitle1">{review.text}</Typography>
            <Divider style={{ marginTop: 10 }} light />
          </div>
        ))}
      <Button
        onClick={() =>
          `${auth ? history.push("/add/comment") : history.push("/signin")}`
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

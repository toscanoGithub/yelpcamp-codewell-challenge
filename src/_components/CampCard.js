import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { useContext } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px 15px 0 15px",
    maxWidth: 400,
    minHeight: 350,
  },

  media: {
    height: 200,
    paddingTop: "56.25%",
    marginBottom: 5,
    borderRadius: 3,
  },

  cardContent: {
    padding: 0,
    minHeight: 100,

    "&>h5": {
      fontSize: "1rem",
      fontWeight: 700,
    },

    "&>h6": {
      fontSize: "1rem",
      marginBottom: 10,
    },
  },

  cardActions: {
    margin: 0,
    padding: 0,
    "&>button": {
      border: "1px solid #B09E9E",
      textTransform: "capitalize",
      color: "black",
      fontWeight: 700,
      "&:hover": {
        border: "1px solid #B09E9E",
        opacity: 0.8,
      },
    },
  },

  creator: {
    margin: "3px 0 0 0",
    color: "#ccc",
    fontSize: "0.7rem",
    fontWeight: 700,
    textAlign: "right",
  },
}));
function CampCard({ _id, pic, title, description, creator }) {
  const classes = useStyles();
  const history = useHistory();

  const viewCampgroundDetails = (e) => {
    e.preventDefault();
    history.push(`/individual/${_id}`);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          height="200"
          className={classes.media}
          image={pic}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={viewCampgroundDetails}
          variant="outlined"
          fullWidth
          size="large"
          color="secondary"
        >
          View Campground
        </Button>
      </CardActions>
      <Typography className={classes.creator} variant="subtitle1">
        By @{creator}
      </Typography>
    </Card>
  );
}

export default CampCard;

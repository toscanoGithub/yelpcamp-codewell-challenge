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
    padding: 10,
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
}));
function CampCard({id, pic, title, description }) {
    const classes = useStyles();
    const history = useHistory();


    const viewCampgroundDetails = (e) => {
        e.preventDefault()
        history.push(`/individual/${id}`);
    }
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
        <Button onClick={viewCampgroundDetails} variant="outlined" fullWidth size="large" color="secondary">
          View Campground
        </Button>
      </CardActions>
    </Card>
  );
}

export default CampCard;

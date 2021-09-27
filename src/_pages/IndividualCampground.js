import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { featuredCamps } from "../data/featured.camps";
import {
  CampgroundsContext,
  SelectedCampgroundContext,
} from "../_helpers/Context";
import map from "../assets/map.png";
import testimonial from "../assets/user-testimonial.svg";
import Reviews from "../_components/Reviews";
import Header from "../_components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  main: {
    width: "90%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      "&>.MuiGrid-item": {
        minWidth: "100%",
      },
    },
  },
  campCard: {
    minWidth: "100%",
  },
  media: {
    height: 200,
    paddingTop: "56.25%",
    marginBottom: 5,
    borderRadius: 3,
  },
  campInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>h6": {
      fontWeight: 700,
    },
    "&>h5": {
      fontWeight: 700,
    },
  },
  map: {
    [theme.breakpoints.down("sm")]: {
      height: 350,
    },
    width: "100%",
    "&>img": {
      padding: 30,
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
}));
function IndividualCampground() {
  const classes = useStyles();
  const { id } = useParams();
  const [selectedCampground, setSelectedCampground] = useState();
  const matches = useMediaQuery("(min-width:992px)");
  const { campgrounds, setCampgrounds } = useContext(CampgroundsContext);

  useEffect(() => {
    setSelectedCampground(campgrounds.filter((sel) => sel._id === id)[0]);
  }, [id]);

  return (
    <div className={classes.root}>
      <Header />
      <Grid
        className={classes.main}
        direction={`${matches ? "row" : "column-reverse"}`}
        container
        spacing={2}
      >
        <Grid item xs={12} sm={5} md={4}>
          <Paper className={classes.map}>
            <img src={map} alt="" />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={7} md={8}>
          <Card className={classes.campCard}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={selectedCampground?.pic}
                title={selectedCampground?.title}
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.campInfo}>
                  <Typography gutterBottom variant="h5">
                    {selectedCampground?.title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    ${selectedCampground?.price}
                  </Typography>
                </div>
                <Typography variant="subtitle1" color="textSecondary">
                  {selectedCampground?.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions className={classes.cardActions}></CardActions> */}
          </Card>
          <Paper>
            <Reviews />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default IndividualCampground;

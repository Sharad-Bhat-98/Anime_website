import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import { Props } from "./tabitem2";

interface ReviewInterface {
  reviews: {
    mal_id: number;
    url: string;
    content: string;
    date: string;
    reviewer: {
      image_url: string;
      username: string;
      scores: {
        overall: number;
      };
    };
  }[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },

  paginate1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TabItem3 = (props: Props) => {
  const id = props.match.params.id;

  const [reviews, setReviews] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reviews
    ? reviews.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginationButtons = reviews
    ? Math.ceil(reviews.length / postsPerPage)
    : 0;

  const paginate = (e: any, val: number) => {
    setCurrentPage(val);
  };

  useEffect(() => {
    const animeReviews = () => {
      fetch(`https://api.jikan.moe/v3/anime/${id}/reviews/1`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: ReviewInterface) => {
          setReviews(data.reviews);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    animeReviews();
  }, [id]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<number | boolean>(false);
  const [expandedSingle, setExpandedSingle] = React.useState(true);

  const handleExpandClick = (index: number) => {
    setExpanded(expandedSingle ? index : false);
    setExpandedSingle(!expandedSingle);
  };

  return (
    <Grid container spacing={3}>
      {reviews
        ? currentPosts.map((e: any, index: number) => {
            return (
              <Grid item xs={12} key={e.mal_id}>
                <Card className={classes.root} elevation={3}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        <img
                          src={e.reviewer.image_url}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                          alt="profile avatar"
                        />
                      </Avatar>
                    }
                    action={
                      <Typography
                        color="primary"
                        variant="body2"
                        style={{ paddingTop: "20px" }}
                      >
                        {e.reviewer.scores.overall}/10
                      </Typography>
                    }
                    title={e.reviewer.username}
                    subheader={e.date}
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="primary"
                      component="p"
                      align="justify"
                    >
                      {e.content.slice(0, 500)}
                    </Typography>
                    <Collapse
                      in={expanded === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Typography
                        variant="body2"
                        color="primary"
                        component="p"
                        align="justify"
                      >
                        {e.content.slice(501)}
                      </Typography>
                    </Collapse>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" disabled>
                      <FavoriteIcon style={{ color: red[500] }} />
                      &nbsp;
                      <Typography variant="body2" style={{ color: red[500] }}>
                        {e.helpful_count}
                      </Typography>
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded === index,
                      })}
                      aria-expanded={expanded === index}
                      aria-label="show more"
                      onClick={() => handleExpandClick(index)}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        : "no-data"}
      <div className={classes.paginate1}>
        <Pagination
          count={paginationButtons}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="large"
          onChange={paginate}
        />
      </div>
    </Grid>
  );
};

export default TabItem3;

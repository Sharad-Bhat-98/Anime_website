import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

interface TopAnimeInterface {
  top: {
    mal_id: number;
    title: string;
    image_url: string;
  }[];
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    height: "520px",
    marginTop: "7px",
  },
  cardCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TopAnime = () => {
  const classes = useStyles();
  const [popular, setPopular] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    const TopAnime = () => {
      fetch("https://api.jikan.moe/v3/top/anime/1/tv", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: TopAnimeInterface) => {
          let arr = data.top;
          // setPopular(data.top)
          TopAnime2(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const TopAnime2 = (arr: TopAnimeInterface["top"]) => {
      fetch("https://api.jikan.moe/v3/top/anime/2/tv", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: TopAnimeInterface) => {
          const arr1 = data.top;
          const data1 = [...arr, ...arr1];
          TopAnime3(data1);

          //setPopular(data1)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const TopAnime3 = (data1: TopAnimeInterface["top"]) => {
      fetch("https://api.jikan.moe/v3/top/anime/3/tv", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: TopAnimeInterface) => {
          let arr = data.top;

          const data2 = [...data1, ...arr];
          setPopular(data2);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    TopAnime();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = popular
    ? popular.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginationButtons = popular
    ? Math.ceil(popular.length / postsPerPage)
    : 0;

  const paginate = (e: any, val: number) => {
    setCurrentPage(val);
  };

  return (
    <React.Fragment>
      <Grid
        container
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentPosts.map((e: any) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={e.mal_id}
              className={classes.cardCenter}
            >
              <Link
                to={`/search/${e.mal_id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      image={e.image_url}
                      title={e.title}
                      height="450px"
                    />
                    <CardContent
                      style={{
                        height: "80px",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="h6"
                        color="primary"
                      >
                        {e.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={paginationButtons}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
        onChange={paginate}
        style={{
          marginTop: "40px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </React.Fragment>
  );
};

export default TopAnime;

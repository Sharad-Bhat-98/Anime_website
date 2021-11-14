import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface Props {
  match: {
    params: {
      name: string;
    };
  };
}
interface SearchResultsInterface {
  results: {
    mal_id: number;
    title: string;
    image_url: string;
  }[];
}

const useStyles = makeStyles({
  root: {
    width: "300px",
    marginTop: "7px",
  },
});

const SearchResults = (props: Props) => {
  const classes = useStyles();
  const { match } = props;
  const [searchAnime, setSearchAnime] = useState<any>([]);

  useEffect(() => {
    const animeSearch = () => {
      fetch(
        `https://api.jikan.moe/v3/search/anime?q=${match.params.name}&limit=8`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data: SearchResultsInterface) => {
          setSearchAnime(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    animeSearch();
  }, [match]);

  return (
    <Grid container spacing={1}>
      {searchAnime ? (
        searchAnime.map((e: any) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={e.mal_id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
                      height="350px"
                    />
                    <CardContent style={{ height: "80px" }}>
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
        })
      ) : (
        <Typography variant="h3" align="center">
          no result
        </Typography>
      )}
    </Grid>
  );
};

export default SearchResults;

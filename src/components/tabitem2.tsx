import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

var arr5: any = [];
interface EpisodeInterface {
  episodes: {
    episode_id: number;
    filler: boolean;
    recap: boolean;
    title: string;
  }[];
  episodes_last_page: number;
}
export interface Props {
  match: {
    params: {
      id: number;
    };
  };
}

const TabItem2 = (props: Props) => {
  const { match } = props;
  const [episodes, setEpisodes] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(24);

  useEffect(() => {
    const animeEpisodes = () => {
      fetch(`https://api.jikan.moe/v3/anime/${match.params.id}/episodes`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: EpisodeInterface) => {
          //console.log(data,'')
          return data;
        })
        .then((data) => {
          //console.log(data.episodes)
          const page = data.episodes_last_page;
          setEpisodes(data.episodes);
          arr5 = data.episodes;
          for (let i = 2; i <= page; i++) {
            animeEpisodes1(i);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    var animeEpisodes1 = async (i: number) => {
      // console.log(arr5)
      try {
        const result = await fetch(
          `https://api.jikan.moe/v3/anime/${match.params.id}/episodes/${i}`,
          {
            method: "GET",
          }
        );
        const data: EpisodeInterface = await result.json();

        arr5 = [...arr5, ...data.episodes];

        setEpisodes(arr5);
      } catch (err) {
        console.log(err);
      }
    };
    animeEpisodes();
  }, [match]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = episodes
    ? episodes.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginationButtons = episodes
    ? Math.ceil(episodes.length / postsPerPage)
    : 1;

  const paginate = (e: any, val: number) => {
    setCurrentPage(val);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {currentPosts
          ? currentPosts.map((e: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={e.episode_id}>
                  <Paper
                    elevation={3}
                    style={{ height: "120px", width: "100%" }}
                  >
                    <Typography color="primary" variant="body2">
                      <b>Number-</b> &nbsp;&nbsp;#
                      {e.episode_id}
                    </Typography>
                    <Typography color="primary" variant="subtitle2">
                      <b> Title-</b>&nbsp;&nbsp;
                      {e.title}
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox checked={e.filler} color="primary" />}
                      label="Filler"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={e.recap} color="primary" />}
                      label="Recap"
                    />
                  </Paper>
                </Grid>
              );
            })
          : "nodata"}
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

export default TabItem2;

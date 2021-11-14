import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

interface characters {
  anime_character: {
    [key: number]: {
      mal_id: number;
      name: string;
      image_url: string;
      role: string;
    };
  }[];
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TabItem1 = (props: characters) => {
  const classes = useStyles();
  const characters = props.anime_character;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = characters
    ? characters.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginationButtons: number = characters
    ? Math.ceil(characters.length / postsPerPage)
    : 0;

  const paginate = (e: any, val: number) => {
    setCurrentPage(val);
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {characters
          ? currentPosts.map((e: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={e.mal_id}>
                  <Paper
                    elevation={3}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography color="primary" variant="body1">
                      <b> {e.name}</b>
                      <br />
                      <span style={{ fontSize: "14px" }}>{e.role} </span>
                    </Typography>

                    <img
                      src={e.image_url}
                      width="100px"
                      height="150px"
                      alt="character pictures"
                    />
                  </Paper>
                </Grid>
              );
            })
          : "no data"}
      </Grid>
      <div className={classes.root}>
        <Pagination
          count={paginationButtons}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="large"
          onChange={paginate}
        />
      </div>
    </React.Fragment>
  );
};

export default TabItem1;

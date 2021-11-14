import { useState, useEffect } from "react";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { UpcomingAnimeInterface } from "./UpcomingAnime";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

const SeasonalAnime = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>([]);
  const [season, setSeason] = React.useState("spring");
  const [dispdate, setDispDate] = useState<Date | null>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    const rest = async () => {
      try {
        const result = await fetch(
          `https://api.jikan.moe/v3/season/${dispdate?.getFullYear()}/${season}`,
          {
            method: "GET",
          }
        );
        const val: UpcomingAnimeInterface = await result.json();
        setData(val.anime);
      } catch (err) {
        console.log(err);
      }
    };
    rest();
  }, [season, dispdate]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data
    ? data.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginationButtons = data ? Math.ceil(data.length / postsPerPage) : 0;

  const paginate = (e: any, val: number) => {
    setCurrentPage(val);
  };

  const handleChange = (event: any) => {
    setSeason(event.target.value);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Season</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={season}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value={"winter"}>Winter</MenuItem>
          <MenuItem value={"spring"}>Spring</MenuItem>
          <MenuItem value={"summer"}>Summer</MenuItem>
          <MenuItem value={"fall"}>Fall</MenuItem>
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          views={["year"]}
          label="Select a Year"
          value={dispdate}
          onChange={setDispDate}
          style={{ marginTop: "8px" }}
        />
      </MuiPickersUtilsProvider>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h5" align="center" color="primary">
        <u>
          {" "}
          {season.toUpperCase()}-{dispdate?.getFullYear()}
        </u>
      </Typography>
      <br />
      <br />
      <Grid container>
        {currentPosts ? (
          currentPosts.map((e: any) => {
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
                          style={{}}
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
          <h4>NO RESULT</h4>
        )}
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
    </div>
  );
};

export default SeasonalAnime;

import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import SimpleTabs from "./tabs";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  match: {
    params: {
      id: number;
    };
  };
}

export interface AnimeDatainterface {
  AnimeData: {
    image_url: string;
    title: string;
    score: number;
    rank: number;
    popularity: number;
    synopsis: string;
    type: string;
    episodes: number;
    aired: {
      string: string;
    };
    status: string;
    premiered: string;
    broadcast: string;
    studios?: string[];
    source: string;
    duration: string;
    rating: string;
    genres?: string[];
  };
}

export interface Statinterface {
  completed: number;
  dropped: number;
  on_hold: number;
  plan_to_watch: number;
  scores: {
    [key: number]: {
      votes: number;
      percentage: number;
    };
  };
}
export interface AnimeCharacters {
  characters: {
    [key: number]: {
      mal_id: number;
      name: string;
      image_url: string;
      role: string;
    }[];
  };
}
const useStyles = makeStyles((theme) => ({
  gridcenter: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "normal",
      alignItems: "flex-start",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      justifyContent: "normal",
      alignItems: "flex-start",
    },
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",

    paddingBottom: "40px",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  },
  font: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },

    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },

  statsfont: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },

    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "17px",
    },
  },

  img: {
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
      marginLeft: "30%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      marginLeft: "35%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginLeft: "25%",
    },
  },
}));

const AnimeDetails = (props: Props) => {
  const { match } = props;
  const classes = useStyles();

  const [animedata, setanimeData] = useState<any>([]);
  const [anime_character, set_anime_character] = useState<any>([]);
  const [stat, setStat] = useState<any>([]);

  useEffect(() => {
    const animeDetails = () => {
      fetch(`https://api.jikan.moe/v3/anime/${match.params.id}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: AnimeDatainterface) => {
          setanimeData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const animeCharacter = () => {
      fetch(
        `https://api.jikan.moe/v3/anime/${match.params.id}/characters_staff`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data: AnimeCharacters) => {
          set_anime_character(data.characters);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const animeStats = () => {
      fetch(`https://api.jikan.moe/v3/anime/${match.params.id}/stats`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: Statinterface) => {
          setStat(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    animeDetails();
    animeCharacter();
    // animeEpisodes()
    animeStats();
  }, [match]);

  return (
    <Grid container spacing={3} className={classes.gridcenter}>
      <Grid item xs={12} md={4} lg={4}>
        {" "}
        <img
          src={animedata ? animedata.image_url : ""}
          className={classes.img}
          alt="anime pictures"
        />
        <Typography color="primary" align="center" variant="h6">
          {animedata.title}
        </Typography>
      </Grid>

      <Grid item xs={12} md={7} lg={7}>
        <div className={classes.stats}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.statsfont}
          >
            Score - {animedata.score}/10
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            className={classes.statsfont}
          >
            Ranked - #{animedata.rank}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            className={classes.statsfont}
          >
            Popularity - #{animedata.popularity}
          </Typography>
        </div>
        <Typography
          variant="h6"
          color="primary"
          align="justify"
          className={classes.font}
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
          paragraph
        >
          <u>
            <b>Synopsis-</b>
          </u>{" "}
          <br />
          {animedata.synopsis}
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <div
          style={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "40px",
          }}
        >
          <Typography color="primary" variant="body1">
            <b>Type- </b>
            {animedata.type}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b>Episodes- </b>
            {animedata.episodes}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b>Aired- </b>
            {animedata.aired ? animedata.aired.string : "-"}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b> Status- </b>
            {animedata.status}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b>Premiered- </b>
            {animedata.premiered}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b>Broadcast- </b>
            {animedata.broadcast}
          </Typography>
          <br></br>

          <Typography color="primary" variant="body1">
            <b>
              {" "}
              Studios-
              {animedata["studios"]
                ? animedata["studios"].map((e: any) => {
                    return e.name;
                  })
                : ""}{" "}
            </b>
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b> Source- </b>
            {animedata.source}
          </Typography>
          <br></br>

          <Typography color="primary" variant="body1">
            <b> Duration- </b>
            {animedata.duration}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b> Rating- </b>
            {animedata.rating}
          </Typography>
          <br></br>
          <Typography color="primary" variant="body1">
            <b> Genres- </b>
            {animedata["genres"]
              ? animedata.genres.map((e: any) => {
                  return `${e.name}, `;
                })
              : "-"}
          </Typography>
          <br></br>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <SimpleTabs
          anime_character={anime_character}
          match={match}
          animedata={animedata}
          stat={stat}
        />
      </Grid>
    </Grid>
  );
};

export default AnimeDetails;

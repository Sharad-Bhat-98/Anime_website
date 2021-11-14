import React from "react";
import { Doughnut } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Statinterface, AnimeDatainterface } from "./animedeatils";

interface Props {
  match: {
    params: {
      id: number;
    };
  };
  animedata: AnimeDatainterface;
  stat: Statinterface;
}
const TabItem4 = (props: Props) => {
  const stat: any = props.stat;
  const scores: any = props.stat.scores;
  const animedata: any = props.animedata;
  let data: any = {};
  try {
    data = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [
        {
          label: "# of Votes",

          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255,105,180, 0.2)",
            "rgba(120, 120, 120,0.2)",
            "rgba(0, 255, 255,0.2)",
            "rgba(57, 255, 180, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255,105,180,1)",
            "rgba(120, 120, 120,1)",
            "rgba(0, 255, 255,1)",
            "rgba(57, 255, 180, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    if (typeof scores == "object") {
      data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "# of Votes",

            data: [
              scores[1].votes,
              scores[2].votes,
              scores[3].votes,
              scores[4].votes,
              scores[5].votes,
              scores[6].votes,
              scores[7].votes,
              scores[8].votes,
              scores[9].votes,
              scores[10].votes,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255,105,180, 0.2)",
              "rgba(120, 120, 120,0.2)",
              "rgba(0, 255, 255,0.2)",
              "rgba(57, 255, 180, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,105,180,1)",
              "rgba(120, 120, 120,1)",
              "rgba(0, 255, 255,1)",
              "rgba(57, 255, 180, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Doughnut data={data} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ paddingTop: "20px", paddingLeft: "20px" }}
        >
          <div style={{ width: "70%", marginLeft: "15%" }}>
            <Typography variant="subtitle1" color="primary">
              Score- {animedata["score"] ? animedata.score : "-"}/10
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Popularity- #
              {animedata["popularity"] ? animedata.popularity : "-"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Rank- #{animedata["rank"] ? animedata.rank : "-"}
            </Typography>

            <Typography variant="subtitle1" color="primary">
              Completed- {stat["completed"] ? stat.completed : "-"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Watching- {stat["watching"] ? stat.watching : "-"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Plan To Watch- {stat["plan_to_watch"] ? stat.plan_to_watch : "-"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              OnHold- {stat["on_hold"] ? stat.on_hold : "-"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Dropped- {stat["dropped"] ? stat.dropped : "-"}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TabItem4;

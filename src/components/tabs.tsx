import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TabItem1 from "./tabitem1";
import TabItem2 from "./tabitem2";
import TabItem3 from "./tabitem3";
import TabItem4 from "./tabitem4";
import { Statinterface, AnimeDatainterface } from "./animedeatils";

interface Props {
  anime_character: {
    [key: number]: {
      mal_id: number;
      name: string;
      image_url: string;
      role: string;
    };
  }[];
  match: {
    params: {
      id: number;
    };
  };
  animedata: AnimeDatainterface;
  stat: Statinterface;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "40px",
  },
}));

export default function SimpleTabs({
  anime_character,
  match,
  animedata,
  stat,
}: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Characters" {...a11yProps(0)} />
          <Tab label="Episodes" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
          <Tab label="Statics" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabItem1 anime_character={anime_character} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabItem2 match={match} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabItem3 match={match} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabItem4 match={match} animedata={animedata} stat={stat} />
      </TabPanel>
    </div>
  );
}

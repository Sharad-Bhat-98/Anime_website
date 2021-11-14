import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  drawerWidth: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function ElevationScroll(props: any) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const NavBar = (props: any) => {
  const classes = useStyles();

  const [view, setView] = useState({
    drawerOpen: false,
  });
  const { drawerOpen } = view;

  const dispMobile = () => {
    const handleDrawerOpen = () => {
      setView({ ...view, drawerOpen: true });
    };
    const handleDrawerClose = () => {
      setView({ ...view, drawerOpen: false });
    };
    return (
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleDrawerOpen}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h6"
            className={classes.title}
            color="primary"
            style={{ paddingLeft: "20px" }}
          >
            <b>Animania</b>
          </Typography>
        </Link>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => handleDrawerClose()}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerWidth}>
            <Link
              to="/top"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText primary={"TOP ANIME"} /> <Divider />
              </ListItem>
            </Link>
            <Link
              to="/seasonal"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText primary={"SEASONAL ANIME"} />
              </ListItem>
            </Link>
            <Link
              to="/upcoming"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText primary={"UPCOMING ANIME"} />
              </ListItem>
            </Link>
          </div>
        </Drawer>
      </Toolbar>
    );
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar color="inherit" style={{ position: "static" }}>
          {dispMobile()}
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

export default NavBar;

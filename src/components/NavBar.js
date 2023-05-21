import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  appName: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  menuItems: {
    display: "flex",
  },
  activeMenuItem: {
    fontWeight: "bold",
  },
}));

const Navbar = ({ handleLogout }) => {
  const classes = useStyles();
  const location = useLocation();

  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.menuItems}>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            className={
              isMenuItemActive("/dashboard") ? classes.activeMenuItem : ""
            }
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/history"
            className={
              isMenuItemActive("/history") ? classes.activeMenuItem : ""
            }
          >
            History
          </Button>
        </div>
        <Typography variant="h6" className={classes.appName} noWrap>
          Portfolio Optimizer
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

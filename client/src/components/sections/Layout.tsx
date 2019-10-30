import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, Grid, Theme, Tabs, Tab } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsIcon from "@material-ui/icons/Settings";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Link } from "react-router-dom";
import { releaseCookie } from "../../utils/auth"
import { GlobalContext } from "../../utils/contexts";

const styles = (theme: Theme) => ({
  logo: {
    width: 50,
    marginTop: 5,
    marginRight: theme.spacing(1)
  }, title: {
    textDecoration: "none",
    minWidth: 160,
    marginRight: 24
  }
});

interface LayoutPropsI {
  classes: Classes;
  currentRoute: string;
}  

class Layout extends Component<LayoutPropsI> {
  static contextType = GlobalContext;
  
  logOut() {
    releaseCookie();
    window.location.reload();
  }

  checkRouteExists(route: string): boolean {
    for(var i in tabRoutes) {
      if(tabRoutes[i].path === route) return true
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <AppBar>
            <Toolbar>
              <Link to="/">
                <img className={classes.logo} src="/images/ipex-icon.png" alt=""/>
              </Link>
              <Typography className={classes.title}>IP3X Admiralty Portal</Typography>
              <div>
                <Tabs value={this.checkRouteExists(this.props.currentRoute) ? this.props.currentRoute : false}>
                  {
                    tabRoutes.map(route => {
                      return <Tab component={Link} to={route.path} key={route.path} value={route.path} label={route.name} />
                    })
                  }
                </Tabs>
              </div>
              <Grid
                container
                direction="row"
                justify="flex-end"
              >
                <Grid item>
                  {(this.context.loggedIn) ? (
                    <Link to="/settings">
                      <IconButton color="secondary">
                        <SettingsIcon/>
                      </IconButton>
                    </Link>
                  ) : null}
                </Grid>
                <Grid item>
                  {(this.context.loggedIn) ? (
                    <IconButton onClick={this.logOut} color="secondary">
                      <MeetingRoomIcon/>
                    </IconButton>
                  ) : null}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        {this.props.children}
      </div>
    )
  }
}

const tabRoutes = [
  {path: "/members", name: "Members"},
  {path: "/bgs", name: "Background Sim"},
  {path: "/stats", name: "Stats"}
]

export default withStyles(styles, { withTheme: true })(Layout);
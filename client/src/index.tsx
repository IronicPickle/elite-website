import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, RouteComponentProps } from "react-router-dom";
import { login, parseCookies } from "./utils/auth";
import { createMuiTheme, LinearProgress, withStyles, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { GlobalContext } from "./utils/contexts";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

import App from "./pages/Index";
import Login from "./components/sections/Login";
import Layout from "./components/sections/Layout";
import RouteListener from "./components/utils/RouteListener";
import UserProfile from "./pages/UserProfile";
import Members from "./pages/Members";
import BGS from "./pages/BGS";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(0, 36, 50, 1)"
    },
    secondary: {
      main: "rgba(253, 203, 14, 1)",
    }
  }
});

const styles = () => ({
  loadingBar: {
    backgroundColor: theme.palette.secondary.main
  }, layout: {

  }
});

interface IndexPropsI {
  classes: Classes;
}
type IndexProps = IndexPropsI & RouteComponentProps;
interface LayoutStateI {
  loggedIn: boolean;
  loading: boolean;
  currentRoute: string;
}

class Index extends Component<IndexProps, LayoutStateI> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {
      loggedIn: authenticated,
      loading: false,
      currentRoute: window.location.pathname
    }

    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
  }

  handleRouteChange(route: string) {
    this.setState({currentRoute: route});
  }

  toggleLoader(state: boolean) {
    this.setState({loading: state});
  }

  render() {
    const { classes } = this.props;
    var mainContent = (this.state.loggedIn) ? (
      <>
        <RouteListener handleRouteChange={this.handleRouteChange}>
          <Route path="/" exact component={App} />
          <Route path="/members" component={Members} />
          <Route path="/bgs" component={BGS} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/user" component={UserProfile} />
        </RouteListener>
      </>
    ) : (
      <>
        <Login />
      </>
    )

    return (
      <Router>
        <ThemeProvider theme={theme} >
          <GlobalContext.Provider value={{toggleLoader: this.toggleLoader, loggedIn: authenticated}}>
            <Box
              position="absolute"
              width="100%"
            >
              <Box
                position="absolute"
                width="100%"
                zIndex="tooltip"
              >
                {(this.state.loading) ? <LinearProgress variant="query" className={classes.loadingBar} /> : null}
              </Box>
              <Layout currentRoute={this.state.currentRoute}>
                {mainContent}
              </Layout>
            </Box>
          </GlobalContext.Provider>
        </ThemeProvider>
      </Router>
    )
  }
}

const cookies = parseCookies();
const password = cookies.token;
var authenticated = false;
login({password}, (res: any, authed: boolean) => {
  authenticated = authed;
  ReactDOM.render(
    React.createElement(
      withStyles(styles, { withTheme: true }) (
        Index
      )
    ), document.getElementById("root")
  );
});

serviceWorker.unregister();

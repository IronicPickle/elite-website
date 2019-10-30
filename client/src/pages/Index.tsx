import React, { Component } from "react";
import { withStyles, Theme, Container, Grid, Typography } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { GlobalContext } from "../utils/contexts";
import Panel from "../components/elements/Panel";

const styles = (theme: Theme) => ({
  mainContainer: {
    marginTop: theme.spacing(15),
    padding: 0,
    maxWidth: "90%"
  }, titleContainer: {
    padding: theme.spacing(2)
  }, contentsContainer: {
    minWidth: "100%"
  }
});

interface IndexPropsI {
  classes: Classes;
  theme: Theme;
}

interface IndexStateI {

}

class Index extends Component<IndexPropsI, IndexStateI> {
  static contextType = GlobalContext;
  
  constructor(props: Readonly<IndexPropsI>) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Panel bg="main">
              <Typography variant="h6" component="h6"
                  >Welcome to the IP3X Admiralty Panel</Typography>
            </Panel>
          </Grid>
          <Grid item className={classes.contentsContainer}>
            <Panel bg="main">
              <Typography variant="body1" component="p"
                >Welcome to the IP3X Admiralty Panel</Typography>
            </Panel>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Index);
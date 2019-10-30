import React, { Component } from "react";
import { withStyles, Theme, Container } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { GlobalContext } from "../utils/contexts";

const styles = (theme: Theme) => ({
  mainContainer: {
    marginTop: theme.spacing(15),
    padding: 0,
    maxWidth: "90%"
  }
});

interface StatsPropsI {
  classes: Classes;
  theme: Theme;
}

interface StatsStateI {

}

class Stats extends Component<StatsPropsI, StatsStateI> {
  static contextType = GlobalContext;
  
  constructor(props: Readonly<StatsPropsI>) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.mainContainer}>

      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Stats);
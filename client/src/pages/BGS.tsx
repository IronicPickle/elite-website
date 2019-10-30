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

interface BGSPropsI {
  classes: Classes;
  theme: Theme;
}

interface BGSStateI {

}

class BGS extends Component<BGSPropsI, BGSStateI> {
  static contextType = GlobalContext;
  
  constructor(props: Readonly<BGSPropsI>) {
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

export default withStyles(styles, { withTheme: true })(BGS);
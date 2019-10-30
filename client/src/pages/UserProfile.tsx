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

interface UserProfilePropsI {
  classes: Classes;
  theme: Theme;
}

interface UserProfileStateI {

}

class UserProfile extends Component<UserProfilePropsI, UserProfileStateI> {
  static contextType = GlobalContext;
  
  constructor(props: Readonly<UserProfilePropsI>) {
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

export default withStyles(styles, { withTheme: true })(UserProfile);
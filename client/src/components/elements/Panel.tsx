import React, { Component } from "react";
import { withStyles, Theme, Paper } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

const styles = (theme: Theme) => ({
  mainContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    maxWidth: "100%"
  }
});

interface UserProfilePropsI {
  classes: Classes;
  theme: Theme;
  bg: string;
  className: string;
}

class UserProfile extends Component<UserProfilePropsI> {
  public static defaultProps = {
      className: ""
  }
  
  render() {
    const { classes, theme } = this.props;
    const colors: { [key: string]: string } = {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark
    }
    return (
      <Paper className={`${classes.mainContainer} ${this.props.className}`} style={{backgroundColor: colors[this.props.bg]}}>
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserProfile);
import { Theme, withStyles, Toolbar, Typography, Grid, TextField } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Component } from "react";
import React from "react";


const styles = (theme: Theme) => ({
  tableWrapper: {
    padding: theme.spacing(2),
    paddingBottom: 0
  }, tableTitleWrapper: {
    paddingBottom: theme.spacing(2),
    paddingRight: 0,
    borderStyle: "solid",
    borderWidth: "0 0 2px 0",
    borderColor: theme.palette.secondary.main
  }, tableTitle: {
    color: theme.palette.primary.contrastText,
    width: 600
  },

  searchBar: {
    width: 400,
    marginRight: theme.spacing(1)
  }, searchBarSelect: {
    width: 200,
    marginRight: theme.spacing(1)
  },

  input: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText
  }, inputNotch: {
    borderColor: `${theme.palette.primary.contrastText} !important`
  }, inputLabel: {
    color: `${theme.palette.primary.contrastText} !important`
  }, selectIcon: {
    color: `${theme.palette.secondary.main} !important`
  }
});
  
interface MembersPropsI {
  classes: Classes;
  theme: Theme;
  onSearchBarChange: any;
}

class MembersTitle extends Component<MembersPropsI> {

  render() {
    const { classes, onSearchBarChange } = this.props;

    return (
      <Toolbar className={classes.tableTitleWrapper}>
          <Typography className={classes.tableTitle} variant="h4" component="h4">Squadron Members</Typography>
          <Grid container justify="flex-end">
            <Grid item>
              <TextField
                id="search"
                label="Search"
                className={classes.searchBar}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputNotch
                  },
                }}
                variant="outlined"
                onChange={onSearchBarChange}
              />
            </Grid>
          </Grid>
        </Toolbar>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MembersTitle);
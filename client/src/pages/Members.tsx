import React, { Component } from "react";
import { withStyles, Theme, Container, Grid, Typography, Toolbar, IconButton } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { GlobalContext } from "../utils/contexts";
import Panel from "../components/elements/Panel";
import MembersTable from "../components/sections/tables/members/MembersTable";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const styles = (theme: Theme) => ({
  mainContainer: {
    marginTop: theme.spacing(15),
    padding: 0,
    maxWidth: "90%"
  }, titleContainer: {
    minWidth: "100%"
  }, contentsContainer: {
    minWidth: "100%"
  }, titleToolbar: {
    minHeight: 0,
    padding: theme.spacing(1),
    
    
  }, titleSection: {
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    borderStyle: "solid",
    borderWidth: "0 0 2px 0",
    borderColor: theme.palette.secondary.main
  }
});

interface MembersPropsI {
  classes: Classes;
  theme: Theme;
}

interface MembersStateI {
  tableData: { [key: string]: any }[];
  presetFilters: { [key: string]: any };
}

class Members extends Component<MembersPropsI, MembersStateI> {
  static contextType = GlobalContext;
  
  constructor(props: Readonly<MembersPropsI>) {
    super(props);
    this.state = {
      tableData: tableData,
      presetFilters: {}
    }

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(filter: { [key: string]: any }) {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.setState({presetFilters: filter});
    }
  }
  
  render() {
    const { classes } = this.props;
    const { tableData, presetFilters } = this.state;
    const outstandingApplications = tableData.filter(member => !member.confirmedByAdmiralty);
    const confirmedApplications = tableData.filter(member => member.confirmedByAdmiralty);
    return (
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item className={classes.titleContainer}>
            <Panel bg="dark">
              <Toolbar className={classes.titleToolbar}>
                <Grid container xs={12} direction="row">
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="center">
                      <Grid item>
                        <IconButton onClick={this.applyFilter({ sortId: "discordName", sortDirection: "asc" })} color="secondary">
                          <PersonIcon/>
                        </IconButton>
                      </Grid>
                    <Grid item>
                      <Typography align="center" variant="h6" component="h6" className={classes.titleSection}
                        >Total Members: {tableData.length}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="center">
                      <Grid item>
                        <IconButton onClick={this.applyFilter({ sortId: "confirmedByAdmiralty", sortDirection: "desc" })} color="secondary">
                          <PersonAddIcon/>
                        </IconButton>
                      </Grid>
                    <Grid item>
                      <Typography align="center" variant="h6" component="h6" className={classes.titleSection}
                        >Outstanding Applications: {outstandingApplications.length}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="center">
                      <Grid item>
                        <IconButton onClick={this.applyFilter({ sortId: "confirmedByAdmiralty", sortDirection: "asc" })} color="secondary">
                          <PersonOutlineIcon/>
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography align="center" variant="h6" component="h6" className={classes.titleSection}
                        >Confirmed Applications: {confirmedApplications.length}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </Panel>
          </Grid>
          <Grid item className={classes.contentsContainer}>
            <MembersTable data={tableData} presetFilters={presetFilters}></MembersTable>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const tableData: { [key: string]: any }[] = [
  { id: 1, discordName: "Dave", ingameName: "Daverino", inaraName: "Daver", joinedPrivateGroup: false, confirmedByAdmiralty: false, comments: "Dave is a lie" },
  { id: 2, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 3, discordName: "Fred", ingameName: "Fredely", inaraName: "Fredder", joinedPrivateGroup: true, confirmedByAdmiralty: false, comments: "Screw fred" },
  { id: 4, discordName: "Fred", ingameName: "Fredely", inaraName: "Fredder", joinedPrivateGroup: true, confirmedByAdmiralty: false, comments: "Screw fred" },
  { id: 5, discordName: "Fred", ingameName: "Fredely", inaraName: "Fredder", joinedPrivateGroup: true, confirmedByAdmiralty: false, comments: "Screw fred" },
  { id: 6, discordName: "Fred", ingameName: "Fredely", inaraName: "Fredder", joinedPrivateGroup: true, confirmedByAdmiralty: false, comments: "Screw fred" },
  { id: 7, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 8, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 9, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 10, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 11, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 12, discordName: "Bob", ingameName: "Bobbody", inaraName: "Bobber", joinedPrivateGroup: true, confirmedByAdmiralty: true, comments: "Bob is awesome" },
  { id: 13, discordName: "Dave", ingameName: "Daverino", inaraName: "Daver", joinedPrivateGroup: false, confirmedByAdmiralty: false, comments: "Dave is a lie" },
  { id: 14, discordName: "Dave", ingameName: "Daverino", inaraName: "Daver", joinedPrivateGroup: false, confirmedByAdmiralty: false, comments: "Dave is a lie" },
  { id: 15, discordName: "Dave", ingameName: "Daverino", inaraName: "Daver", joinedPrivateGroup: false, confirmedByAdmiralty: false, comments: "Dave is a lie" },
  { id: 16, discordName: "Dave", ingameName: "Daverino", inaraName: "Daver", joinedPrivateGroup: false, confirmedByAdmiralty: false, comments: "Dave is a lie" }
]

export default withStyles(styles, { withTheme: true })(Members);
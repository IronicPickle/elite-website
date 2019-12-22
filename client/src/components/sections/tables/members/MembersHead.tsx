import { Theme, TableHead, TableRow, TableCell, TableSortLabel, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Component } from "react";
import React from "react";


const styles = (theme: Theme) => ({
  headMain: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
  }, headRow: {
    
  }, headCell: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.secondary.main,
    borderWidth: 2
  }, headCellIcon: {
    color: `${theme.palette.secondary.main} !important`
  }
});
  
interface MembersPropsI {
  classes: Classes;
  theme: Theme;
  tableColumns: { [key: string]: any }[];
  filters: { [key: string]: any };
  onSortButtonClick: Function;
}

class MembersHead extends Component<MembersPropsI> {

  render() {
    const {
      classes,
      theme,
      tableColumns,
      filters,
      onSortButtonClick
    } = this.props;

    return (
      <TableHead className={classes.headMain}>
        <TableRow className={classes.headRow}>
          {
            tableColumns.map(column => {
              return (
                <TableCell align="center" className={classes.headCell}>
                  <TableSortLabel
                    active={filters.sortId === column.name}
                    direction={filters.sortDirection}
                    onClick={onSortButtonClick(column.name)}
                    hideSortIcon={true}
                    style={{color: theme.palette.primary.contrastText}}
                    classes={{
                      icon: classes.headCellIcon
                    }}
                  >
                    {column.title}
                  </TableSortLabel>
                </TableCell>
              )
            })
          }
          <TableCell align="center" className={classes.headCell}>Actions</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MembersHead);
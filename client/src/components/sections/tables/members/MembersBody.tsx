import { Theme, TableRow, TableCell, withStyles, TableBody, Checkbox, IconButton } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Component } from "react";
import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";


const styles = (theme: Theme) => ({
  bodyMain: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
  }, bodyRow: {
    
  }, bodyCell: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.secondary.main,
    borderWidth: 1
  }, footer: {
    color: theme.palette.primary.contrastText
  }
});
  
interface MembersPropsI {
  classes: Classes;
  theme: Theme;
  tableColumns: { [key: string]: any }[];
  rows: { [key: string]: any }[];
  rowsDeepCopy: { [key: string]: any }[];
  onCheckboxChange: Function;
  onIconButtonClick: Function
}

class MembersHead extends Component<MembersPropsI> {

  render() {
    const {
      classes,
      rows,
      rowsDeepCopy,
      tableColumns,
      onCheckboxChange,
      onIconButtonClick
    } = this.props;

    return (
      <TableBody className={classes.bodyMain}>
        {
          rowsDeepCopy.map(row => {
            return (
              <TableRow className={classes.bodyRow}>
                {
                  tableColumns.map(column => {
                    return (
                      <TableCell align="center" className={classes.bodyCell} style={(row.confirmedByAdmiralty) ? {opacity: 0.4} : {}}>
                        {
                          (column.isBool) ? 
                            <Checkbox
                              onChange={
                                (!column.disabled) ?
                                  onCheckboxChange(rows.map(row1 => {
                                    return row1.id;
                                  }).indexOf(row.id), column.name)
                                  : () => {}
                              }
                              value={row[column.name]}
                              checked={row[column.name]}
                              disableRipple={row.confirmedByAdmiralty || column.disabled}
                            />
                          : row[column.name]
                        }
                      </TableCell>
                    )
                  })
                }
                <TableCell align="center" className={classes.bodyCell}>
                    {
                      (!row.confirmedByAdmiralty) ?
                        <IconButton onClick={onIconButtonClick("confirmMember")} color="secondary">
                          <CheckIcon color="secondary"/>
                        </IconButton>
                      :
                        <IconButton onClick={onIconButtonClick("revertMember")} color="secondary">
                          <ClearIcon color="secondary"/>
                        </IconButton>
                    }
                  {
                    (!row.confirmedByAdmiralty) ?
                      <IconButton onClick={onIconButtonClick("notifyMember")} color="secondary">
                        <NotificationsActiveIcon color="secondary"/>
                      </IconButton>
                    : null
                  }
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MembersHead);
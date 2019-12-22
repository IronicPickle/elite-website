import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Theme, withStyles, Table, TablePagination } from "@material-ui/core";
import { Classes } from "jss";
import Panel from "../../../elements/Panel";

import MembersHead from "./MembersHead";
import MembersBody from "./MembersBody";
import MembersTitle from "./MembersTitle";

const styles = (theme: Theme) => ({
  table: {
    
  }, selectIcon: {
    color: `${theme.palette.secondary.main} !important`
  }, footer: {
    color: theme.palette.primary.contrastText
  }
});
  
interface MembersPropsI {
  classes: Classes;
  theme: Theme;
  data: { [key: string]: any }[];
  presetFilters: { [key: string]: any };
}

interface MembersStateI {
  rows: { [key: string]: any }[];
  sortId: string;
  sortDirection: "asc" | "desc" | undefined;
  searchQuery: string;
  currentPage: number;
  rowsPerPage: number;
  usePresetFilters: boolean;
}

class MembersTable extends Component<MembersPropsI, MembersStateI> {
  constructor(props: Readonly<MembersPropsI>) {
    super(props);
    this.state = {
      rows: props.data,
      sortId: "discordName",
      sortDirection: "asc",
      searchQuery: "",
      currentPage: 0,
      rowsPerPage: 10,
      usePresetFilters: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleIconButtonClick = this.handleIconButtonClick.bind(this);
    this.handleSortButtonClick = this.handleSortButtonClick.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
  }

  handleCheckboxChange(rowId: number, columnName: string) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      var rows = this.state.rows;
      const row = this.state.rows[rowId];
      if(row && !row.confirmedByAdmiralty) {
        row[columnName] = !row[columnName];
        rows[rowId] = row;
        this.setState({rows});
      }
    }
  }

  handleIconButtonClick(iconType: string) {
    return (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      iconMethods[iconType]();
    }
  }

  handleSortButtonClick(columnName: string) {
    return (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      var sortDirection: "asc" | "desc" | undefined = "asc";
      if(this.state.sortId === columnName) {
        sortDirection = (this.state.sortDirection === "asc") ? "desc" : "asc";
      }
      this.setState({ sortId: columnName, sortDirection: sortDirection, usePresetFilters: false });
    }
  }

  handleSearchBarChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const searchQuery: string = event.target.value;
    this.setState({ searchQuery, currentPage: 0 });
  }

  handlePageChange(x: any, pageNumber: number) {
    this.setState({currentPage: pageNumber});
  }

  handleRowsPerPageChange(event: ChangeEvent<HTMLInputElement>) {
    const rowsPerPage: number = parseInt(event.target.value);
    this.setState({rowsPerPage});
  }

  componentWillReceiveProps() {
    this.setState({ usePresetFilters: true });
  }
    
  render() {
    const { classes, presetFilters } = this.props;
    const {
      rows,
      sortId,
      sortDirection,
      searchQuery,
      currentPage,
      rowsPerPage,
      usePresetFilters
    } = this.state;

    var filters: { [key: string]: any } = presetFilters;
    if(!usePresetFilters) {
      filters.sortId = sortId;
      filters.sortDirection = sortDirection;
    } 

    var rowsDeepCopy: { [key: string]: any }[] = JSON.parse(JSON.stringify(rows));
    sortRows(rowsDeepCopy, filters.sortId, filters.sortDirection);
    rowsDeepCopy = filterRows(rowsDeepCopy, searchQuery);
    const rowsLength = rowsDeepCopy.length;
    rowsDeepCopy = snipRows(rowsDeepCopy, currentPage, rowsPerPage);

    return (
      <Panel className={classes.tableWrapper} bg="dark">
        <MembersTitle
          onSearchBarChange={this.handleSearchBarChange}
        />
        <Table className={classes.table}>
          <MembersHead
            tableColumns={tableColumns}
            filters={filters}
            onSortButtonClick={this.handleSortButtonClick}
          />
          <MembersBody
            tableColumns={tableColumns}
            rows={rows}
            rowsDeepCopy={rowsDeepCopy}
            onCheckboxChange={this.handleCheckboxChange}
            onIconButtonClick={this.handleIconButtonClick}
          />
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page",
          }}
          SelectProps={{
            classes: {
              icon: classes.selectIcon
            }
          }}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handleRowsPerPageChange}
          className={classes.footer}
        />
      </Panel>
    )
  }
}

const sortRows = (rows: { [key: string]: any }[], columnName: string, sortDirection: "asc" | "desc" | undefined) => {
  rows.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
    const A = ((sortDirection === "asc") ? a : b)[columnName];
    const B = ((sortDirection !== "asc") ? a : b)[columnName];
    return sortMethods[typeof A](A, B);
  });
}

const sortMethods: { [key: string]: Function } = {
  string: (A: string, B: string) => {
    return A.localeCompare(B);
  }, number: (A: number, B: number) => {
    return A - B;
  }, boolean: (A: boolean, B: boolean) => {
    return (A < B) ? 1 : -1;
  }
}

const filterRows = (rows: { [key: string]: any }[], searchQuery: string) => {
  const filteredRows = rows.filter((row: { [key: string]: any }) => {
    for(var i in row) {
      const column = row[i];
      const columnAsString = (column + "").toLocaleLowerCase();
      if(columnAsString.includes(searchQuery)) {
        return true;
      }
    }
    return false;
  });
  return filteredRows;
}

const iconMethods: { [key: string]: any } = {
  confirmMember: () => {
    console.log("confirm");
  }, revertMember: () => {
    console.log("revert");
  }, notifyMember: () => {
    console.log("notify");
  }
}

const snipRows = (rows: { [key: string]: any }[], currentPage: number, rowsPerPage: number) => {
  const startIndex = (currentPage * rowsPerPage)
  return rows.slice(startIndex, (startIndex + rowsPerPage));
}

const tableColumns: { [key: string]: any }[] = [
  { name: "id", title: "Member ID" },
  { name: "discordName", title: "Discord Name" },
  { name: "ingameName", title: "In-Game Name" },
  { name: "inaraName", title: "Inara Name" },
  { name: "joinedPrivateGroup", title: "Joined Private Group", isBool: true },
  { name: "comments", title: "Comments" },
  { name: "confirmedByAdmiralty", title: "Confirmed", isBool: true, disabled: true }
]


export default withStyles(styles, { withTheme: true })(MembersTable);
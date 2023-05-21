import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography } from "@material-ui/core";

const SortableTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    column,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {props.rowSelection ? <TableCell></TableCell> : null}
      {column.map((item, index) => {
        return (
          <TableCell
            key={index}
            sortDirection={orderBy === item.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === item.field}
              direction={orderBy === item.field ? order : "asc"}
              onClick={createSortHandler(item.field)}
            >
              {item.title}
              {orderBy === item.field ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        );
      })}
    </TableHead>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableHeading: {
    fontSize: 14,
  },
  tableBody: {
    fontSize: "10pt",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DynamicTable = ({
  column = [],
  data = [],
  loading = false,
  rowSelection = false,
  paginationDisplay = true,
  onChange,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles();

  useEffect(() => {
    setRowsPerPage(paginationDisplay ? 5 : data.length);
  }, []);
  useEffect(() => {
    data.length !== 0 && setSelected([]);
    data.length !== 0 && setRowsPerPage(paginationDisplay ? 5 : data.length);
  }, [data]);

  const resetSelection = () => {
    console.log("reset selected");

    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    console.log("Page Change", newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    console.log("Row Per change: ", parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, item) => {
    const selectedIndex = selected
      .map((item, index) => item.name)
      .indexOf(item.name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onChange("rowData", newSelected);
  };

  const isSelected = (name) =>
    selected.map((item, index) => item.name).indexOf(name) !== -1;

  const rowSelectedAction = (item) => {
    console.log("Row selected: ", item);
  };

  const convertDate = (dateValue) => {
    if (dateValue) {
      let dateObject = new Date(dateValue);
      // 7/31/2020
      let todayYear = dateObject.getFullYear();

      let todayMonth = () => {
        let currentMonth = (dateObject.getMonth() + 1).toString();
        if (currentMonth.length < 2) {
          return "0" + currentMonth;
        } else {
          return currentMonth;
        }
      };
      let todayDay = () => {
        if (dateObject.getDate().toString().length < 2) {
          return "0" + dateObject.getDate().toString();
        } else {
          return dateObject.getDate().toString();
        }
      };
      let stringDate =
        todayYear.toString() + "-" + todayMonth() + "-" + todayDay();
      return stringDate;
    } else {
      return "";
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <SortableTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            column={column}
            rowSelection={rowSelection}
          />

          {loading ? (
            <TableBody>
              {new Array(5).fill(0).map((item, index) => (
                <TableRow>
                  {column.map((heading, index) => (
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : data.length == 0 ? (
            <Typography>No data available</Typography>
          ) : (
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const isItemSelected = isSelected(item.name);

                  return (
                    <TableRow
                      key={item.id}
                      onClick={(event) => {
                        if (rowSelection) {
                          handleClick(event, item);
                        }
                      }}
                      role={rowSelection ? "checkbox" : null}
                      selected={rowSelection ? isItemSelected : null}
                      col
                    >
                      {rowSelection ? (
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          defaultChecked={false}
                        />
                      ) : null}

                      {column.map((heading, index) => {
                        const { type, field, style } = heading;
                        if (type && type === "date") {
                          return (
                            <TableCell>{convertDate(item[field])}</TableCell>
                          );
                        } else if (item[field] == "Payable") {
                          return (
                            <TableCell style={{ color: "#FF0000" }}>
                              {item[field]}
                            </TableCell>
                          );
                        } else if (item[field] == "Receiveable") {
                          return (
                            <TableCell style={{ color: "#30B763" }}>
                              {item[field]}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell style={{ color: style }}>
                              {item[field]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {paginationDisplay ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 30, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
};

export default DynamicTable;

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
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useTableSearch } from "./useTableSearch";
import {
  Grid,
  Card,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CardContent,
  Box,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

// icons
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import RemoveIcon from "@material-ui/icons/Remove";
import { DateIndividualGetter } from "./DateComponents";
import { toFloatAmount } from "app/utils";

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
    expandedData,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {props.rowSelection ? <TableCell></TableCell> : null}
      {expandedData && <TableCell></TableCell>}
      {column.map((item, index) => {
        if (item.disableSort) {
          return <TableCell key={index}>{item.title}</TableCell>;
        } else {
          return item.type === "amount" ? (
            <TableCell
              key={index}
              sortDirection={orderBy === item.field ? order : false}
              align="right"
            >
              <TableSortLabel
                active={orderBy === item.field}
                direction={orderBy === item.field ? order : "asc"}
                onClick={createSortHandler(item.field)}
              >
                {item.title}
                {orderBy === item.field ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
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
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        }
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DynamicDataTable = ({
  column = [],
  data = [],
  loading = false,
  rowSelection = false,
  paginationDisplay = true,
  isServerPaginate = false,
  onChange,
  onCellUpdate = (f) => f,
  isSearch = true,
  expandedData,
  header,
}) => {
  const [tableLoading, seTableLoading] = useState(loading);
  const [preFiltered, setPreFiltered] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  // table search

  useEffect(() => {
    setPreFiltered(data);
  }, [data]);

  useEffect(() => {
    seTableLoading(loading);
  }, [loading]);

  const { filteredData, tbloading } = useTableSearch({
    searchVal,
    retrieve: preFiltered,
  });

  const tableFilter = (e) => {
    let targetvalue = e.target.value;
    setSearchVal(targetvalue);
  };

  return (
    <>
      <Grid container direction="column">
        {isSearch ? (
          <Grid container direction="row" spacing={5}>
            <Grid item xs>
              <TextField
                margin="dense"
                variant="outlined"
                label="Search"
                onChange={tableFilter}
              />
            </Grid>
            <Grid item xs>
              <div style={{}}>
                <b> {header} </b>
              </div>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs>
            <div style={{ textAlign: "center" }}>
              <b> {header} </b>
            </div>
          </Grid>
        )}

        <Grid item xs>
          <DynamicTable
            column={column}
            data={filteredData}
            loading={tableLoading}
            rowSelection={rowSelection}
            paginationDisplay={paginationDisplay}
            onChange={onChange}
            onCellUpdate={onCellUpdate}
            expandedData={expandedData}
          />
        </Grid>
      </Grid>
    </>
  );
};

const EditField = ({ type, field, rowData, updateRowData = (f) => f }) => {
  // month year start
  const changeMonthIndex = () => {
    let todayDate = new Date(rowData.allRow[field]);
    let todayMonth = (todayDate.getMonth() + 1).toString();
    if (todayMonth.length < 2) {
      return "0" + todayMonth;
    } else {
      return todayMonth;
    }
  };
  const [expiryMonthYear, setExpiryMonthYear] = useState({
    month: changeMonthIndex(),
    year: new Date(rowData.allRow[field]).getFullYear(),
  });

  const monthsArray = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];
  const getYears = (start, end) => {
    let yearsArray = [];
    for (let i = start; i <= end; i++) {
      yearsArray.push(i);
    }
    return yearsArray;
  };

  switch (type) {
    case "monthYear":
      return (
        <>
          <FormControl fullWidth>
            <Select
              variant="outlined"
              margin="dense"
              labelId="expiryMonth"
              id="month"
              name="expiryDate"
              required={true}
              value={expiryMonthYear.month}
              onChange={(event) => {
                setExpiryMonthYear(
                  (expiryMonthYear) =>
                    (expiryMonthYear = {
                      ...expiryMonthYear,
                      month: event.target.value,
                    })
                );
                updateRowData(
                  event,
                  `${expiryMonthYear.year}-${event.target.value}-15`
                );
                // props.onChange(`${expiryMonthYear.year}-${event.target.value}-15`)
              }}
            >
              {monthsArray.map((item, index) => {
                const { name, value } = item;
                return (
                  <MenuItem key={index} value={value}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              variant="outlined"
              margin="dense"
              labelId="expiryYear"
              id="year"
              name="expiryDate"
              required={true}
              value={expiryMonthYear.year}
              onChange={(event) => {
                setExpiryMonthYear(
                  (expiryMonthYear) =>
                    (expiryMonthYear = {
                      ...expiryMonthYear,
                      year: event.target.value,
                    })
                );
                updateRowData(
                  event,
                  `${event.target.value}-${expiryMonthYear.month}-15`
                );
              }}
            >
              {getYears(
                parseInt(
                  new DateIndividualGetter(
                    rowData.allRow.manufactureDate
                  ).getTodayYear()
                ) - 3,
                parseInt(
                  new DateIndividualGetter(
                    rowData.allRow.expiryDate
                  ).getTodayYear()
                ) + 3
              ).map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>
      );

    default:
      return (
        <TextField
          margin="dense"
          variant="outlined"
          type={type ? type : "text"}
          name={field}
          value={rowData.allRow[field]}
          onChange={(e) => updateRowData(e)}
        />
      );
  }
};

const EditableComponent = ({
  clearCallBack = (f) => f,
  checkCallBack = (f) => f,
  type,
  field,
  rowData,
  updateRowData = (f) => f,
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs>
          <EditField
            type={type}
            field={field}
            rowData={rowData}
            updateRowData={updateRowData}
          />
        </Grid>
        <Grid item xs>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={clearCallBack}
          >
            <ClearIcon />
          </IconButton>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={checkCallBack}
          >
            <CheckIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

const EditableTableCell = ({
  item,
  field,
  type,
  render,
  iconToRender,
  editable,
  onCellUpdate = (f) => f,
}) => {
  const [rowData, setRowData] = useState({
    allRow: null,
    preUpdateRow: null,
    editable: false,
  });
  useEffect(() => {
    setRowData(
      (rowData) =>
        (rowData = {
          ...rowData,
          allRow: item,
          preUpdateRow: item,
        })
    );
  }, []);
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
        todayYear.toString() + "/" + todayMonth() + "/" + todayDay();
      return stringDate;
    } else {
      return "";
    }
  };

  const convertDateTime = (value) => {
    if (value) {
      let date = convertDate(value);
      let dateObject = new Date(value);
      let time = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
      return `${date}, ${time}`;
    } else {
      return "";
    }
  };

  const typeConvert = (value, type) => {
    switch (type) {
      case "date":
        return convertDate(value) ? convertDate(value) : "";
      case "float":
        return parseFloat(value).toFixed(2) ? parseFloat(value).toFixed(2) : "";
      case "monthYear":
        return new DateIndividualGetter(value).getCurrentMonth()
          ? `${new DateIndividualGetter(
              value
            ).getCurrentMonth()}/${new DateIndividualGetter(
              value
            ).getTodayYear()}`
          : "";
      case "boolean":
        return value ? (
          <CheckIcon fontSize="small" />
        ) : (
          <RemoveIcon fontSize="small" />
        );
      case "datetime":
        return convertDateTime(value);
      default:
        return value;
    }
  };

  const updateRowData = (e, value = null) => {
    let targetValue = e.target.value;
    let targetField = e.target.name;
    console.log("Updating row: ", targetField, value);
    switch (targetField) {
      case "expiryDate":
        setRowData(
          (rowData) =>
            (rowData = {
              ...rowData,
              allRow: {
                ...rowData.allRow,
                [targetField]: value,
              },
            })
        );

        break;

      default:
        setRowData(
          (rowData) =>
            (rowData = {
              ...rowData,
              allRow: {
                ...rowData.allRow,
                [targetField]: targetValue,
              },
            })
        );
        break;
    }
  };

  const clearCallBack = () => {
    setRowData(
      (rowData) =>
        (rowData = {
          ...rowData,
          allRow: {
            ...rowData.allRow,
            [field]: rowData.preUpdateRow[field],
          },
          editable: false,
        })
    );
  };

  const checkCallBack = () => {
    setRowData(
      (rowData) =>
        (rowData = {
          ...rowData,
          editable: false,
        })
    );
    onCellUpdate.receiveNewData(
      { ...rowData.allRow },
      { ...rowData.preUpdateRow }
    );
  };

  if (editable) {
    if (rowData.editable) {
      return (
        <EditableComponent
          clearCallBack={clearCallBack}
          checkCallBack={checkCallBack}
          type={type}
          field={field}
          rowData={rowData}
          updateRowData={updateRowData}
        />
      );
    } else {
      return (
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() => {
            setRowData((rowData) => (rowData = { ...rowData, editable: true }));
          }}
        >
          {typeConvert(item[field], type)}
        </TableCell>
      );
    }
  } else {
    if (render) {
      return <TableCell>{typeConvert(render(item))}</TableCell>;
    } else if (iconToRender) {
      return (
        <TableCell>
          <IconButton
            onClick={() => {
              onCellUpdate.actionCallBack({ ...rowData.allRow });
            }}
          >
            {iconToRender}
          </IconButton>
        </TableCell>
      );
    } else {
      return type === "amount" ? (
        <TableCell align="right">{typeConvert(item[field], type)}</TableCell>
      ) : (
        <TableCell>{typeConvert(item[field], type)}</TableCell>
      );
    }
  }
};

const DynamicTable = ({
  column = [],
  data = [],
  loading = false,
  rowSelection = false,
  paginationDisplay = true,
  onChange,
  onCellUpdate = (f) => f,
  expandedData,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  useEffect(() => {
    setRowsPerPage(paginationDisplay ? 10 : data.length);
  }, []);
  useEffect(() => {
    setSelected([]);
    setRowsPerPage(paginationDisplay ? 10 : data.length);
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
    // console.log("Page Change", newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    // console.log("Row Per change: ", parseInt(event.target.value, 10));
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

  return (
    <>
      <TableContainer component={Grid}>
        {" "}
        {/*This is change paper to grid*/}
        <Table size="small">
          <SortableTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            column={column}
            rowSelection={rowSelection}
            expandedData={expandedData ? true : false}
          />

          {loading ? (
            <TableBody>
              {new Array(10).fill(0).map((item, index) => (
                <TableRow>
                  {column.map((heading, index) => (
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(
                  page > 0 && data.length < rowsPerPage
                    ? 0
                    : page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((item, index) => {
                  return (
                    <BodyRenderer
                      item={item}
                      column={column}
                      onCellUpdate={onCellUpdate}
                      handleClick={handleClick}
                      expandedData={expandedData}
                      isSelected={isSelected}
                    />
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {paginationDisplay ? (
        <TablePagination
          rowsPerPageOptions={[10, 30, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page > 0 && data.length < rowsPerPage ? 0 : page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
};

const BodyRenderer = ({
  item,
  column,
  onCellUpdate,
  rowSelection,
  handleClick,
  expandedData,
  isSelected,
}) => {
  const isItemSelected = isSelected(item.name);
  const [open, setOpen] = useState(false);

  return (
    <>
      {expandedData ? (
        <>
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
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>

            {column.map((heading, index) => {
              const { type, field, editable, render, iconToRender } = heading;
              return (
                <EditableTableCell
                  item={item}
                  field={field}
                  render={render}
                  iconToRender={iconToRender}
                  type={type}
                  editable={editable}
                  onCellUpdate={onCellUpdate}
                />
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={Object.keys(item).length}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>{expandedData(item)}</Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      ) : (
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
            const { type, field, editable, render, iconToRender } = heading;
            return (
              <EditableTableCell
                item={item}
                field={field}
                render={render}
                iconToRender={iconToRender}
                type={type}
                editable={editable}
                onCellUpdate={onCellUpdate}
              />
            );
          })}
        </TableRow>
      )}
    </>
  );
};

export default DynamicDataTable;

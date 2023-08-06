import {
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { logoutUser } from "../../action/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import useStyles from "../../styles/Styles";
import axios from "axios";
import DynamicDataTableServerPaginate from "../../components/DynamicDataTable/DynamicTableServerPaginate";

const History = ({ auth, logoutUser }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (userId) => {
    try {
      const response = await axios
        .get("http://localhost:8000/api/savedPortfolios", {
          params: { userId },
        })
        .then((res) => setData(res.data));
      console.log(response);
    } catch (err) {}
  };
  console.log(data);

  useEffect(() => {
    fetchData(auth.user.email);
  }, []);
  const columns = [
    { title: "S.N", field: "sn" },
    { title: "Date", field: "date" },
    { title: "Email", field: "email" },
  ];
  const tableData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      sn: index + 1,
      date: new Date(item.updatedAt).toLocaleString(),
      email: auth.user.email, // Convert updatedAt to date in a readable format
    }));
  }, [data]);

  return (
    <Paper className={classes.bodyCard}>
      <Typography variant="h6" component="h6">
        Greetings, {auth.user.email} 🙏
      </Typography>
      <Divider />
      <div style={{ marginTop: "20px" }}>
        <DynamicDataTableServerPaginate
          column={columns}
          data={tableData}
          paginationDisplay={false}
          expandedData={(rowData) => {
            return (
              <>
                <Grid container direction="row">
                  <Grid item xs={6} md={6}>
                    <Paper className={classes.reportPaper}>
                      <Typography
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          marginLeft: "200px",
                          color: "#3F51B5",
                        }}
                      >
                        Initial Data
                      </Typography>
                      <Divider />
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 }}>
                                Symbol
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 }}>
                                Amount
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowData.initialPortfolio.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>{item.symbol}</TableCell>
                              <TableCell>{item.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Paper className={classes.reportPaper}>
                      <Typography
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          marginLeft: "200px",
                          color: "#3F51B5",
                        }}
                      >
                        Final Data
                      </Typography>
                      <Divider />

                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 }}>
                                Symbol
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 }}>
                                Percentage
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowData.finalPortfolio.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>{item.symbol}</TableCell>
                              <TableCell>{`${(item.amount * 100).toFixed(
                                2
                              )}%`}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            );
          }}
        />
      </div>
    </Paper>
  );
};

History.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(History);

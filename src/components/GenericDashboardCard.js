import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../Theme/Styles";

const GenericDashboardCard = ({
  title,
  cardLogo,
  data,
  dataDefiner,
  link,
  amount,
  secondaryDataDefiner = "Amount",
}) => {
  const classes = useStyles();
  const accountColumn = [
    { title: "S.N.", field: "id" },
    { title: "Client Name", field: "clientName" },
    {
      title: "Investment Amount",
      field: "investmentAmount",
    },
  ];

  return (
    <Link to={link ? link : null} style={{ textDecoration: "none" }}>
      <Card
        variant="outlined"
        className={[classes.dashboardCard, classes.dashboardCardLit]}
      >
        <CardContent>
          <Grid container xs={12} direction="row">
            <Grid item xs={10}>
              <Typography variant="body1" style={{ color: "#E3EDFF" }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box
                component="div"
                className={[
                  classes.dashboardCardIcon,
                  classes.cardIconBgLitBlue,
                ]}
              >
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "0 auto",
                  }}
                  src={cardLogo}
                />
              </Box>
            </Grid>
          </Grid>
          {amount ? (
            <Grid container direction="row" style={{ marginTop: "1vh" }}>
              <Grid item md={4} xs={4}>
                <Typography className={classes.dashboardCardLitHeader}>
                  {data ? <div>{data}</div> : "-"}
                </Typography>
                <Typography className={classes.dashboardCardLitBody}>
                  {dataDefiner}
                </Typography>
              </Grid>
              <Grid
                item
                md={8}
                xs={8}
                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
              >
                <Typography
                  className={classes.dashboardCardLitHeader}
                  align="right"
                >
                  {amount ? <div>{amount}</div> : "-"}
                </Typography>
                <Typography
                  className={classes.dashboardCardLitBody}
                  style={{ textAlign: "right" }}
                >
                  {secondaryDataDefiner}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography className={classes.dashboardCardLitHeader}>
                {data ? <div>{data}</div> : "-"}
              </Typography>
              <Typography className={classes.dashboardCardLitBody}>
                {dataDefiner}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
export default GenericDashboardCard;

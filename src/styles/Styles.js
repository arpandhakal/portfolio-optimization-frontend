import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  paper: {
    padding: theme.spacing(2),
  },
  chartPaper: {
    padding: theme.spacing(2),
  },
  pageHeader: {
    fontWeight: "bold",
    paddingBottom: "0.2rem",
  },
  dashboardCard: {
    height: "9rem",

    borderRadius: 20,
  },
  dashboardCardLit: {
    backgroundColor: "#0F8E3E",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  reportCard: {
    height: "9rem",
    borderRadius: 20,

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#F5FBD6",
    width: "16vw",
  },

  bodyCard: {
    minHeight: "545px",
    maxHeight: "10000px",
    backgroundColor: "#F2F2F2",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "1vh",
    padding: "10px",
    margin: "15px",
  },
  bodyCardSecondaryCard: {
    minHeight: "560px",
    maxHeight: "560px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "1vh",
    padding: "10px",
    borderRadius: 20,
  },
  bodyCardSecondaryReport: {
    height: "69vh",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "1vh",
    padding: "3vh",
    borderRadius: 20,
  },

  bodyCardLit: {
    backgroundColor: "rgba(15, 142, 62, 0.1) !important",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  customCard: {
    minHeight: "630px",
    borderRadius: 20,
    minWidth: "26vw",

    [theme.breakpoints.down("sm")]: {
      minHeight: "20rem",
      minWidth: "12rem",
    },
  },
  customCardLit: {
    backgroundColor: "rgba(15, 142, 62, 0.1) !important",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "rgba(15, 142, 62, 0.3) !important",
    },
  },
  dashboardCardIcon: {
    borderRadius: "5rem",
    width: "3rem",
    height: "3rem",
    padding: ".6rem",
  },
  dashboardCardLitHeader: {
    fontSize: "1.5rem",
    fontWeight: 400,
    padding: "0 0 0 0",
    color: "#fff",
  },
  dashboardCardLitAmount: {
    fontSize: "1.7rem",
    fontWeight: "bold",
    padding: "0 0 0 0",
    color: "#fff",
  },
  reportCardLitHeader: {
    fontSize: "2rem",
    fontWeight: 500,
    padding: "0 0 0 0",
    color: "#0F8E3E",
    textAlign: "center",
  },
  dashboardCardLitHeaderClient: {
    fontSize: "1.2rem",
    fontWeight: 400,
    marginLeft: "10px",
    padding: "0 0 0 0",
    color: "#fff",
  },
  dashboardCardLitBodyClient: {
    fontSize: "1.2rem",
    padding: "0 0 0 0",
    fontWeight: 400,
    wordWrap: "break-word",
    color: "#97BDFF",
  },
  cardIconBgLitBlue: {
    backgroundColor: "#F5FAF5",
  },
  cardIconBgRed: {
    backgroundColor: "#FFE6E8",
  },
  cardIconBgGreen: {
    backgroundColor: "#DEFFE7",
  },
  cardIconBgYellow: {
    backgroundColor: "#FFF8E2",
  },

  dashboardCardComboHeader: {
    fontSize: "1.7rem",
    fontWeight: 400,
    padding: "1.3rem 0 0 0",
  },
  dashboardCardLitBody: {
    fontSize: "1rem",
    padding: "0 0 0 0",
    fontWeight: 400,
    wordWrap: "break-word",
    color: "#97BDFF",
  },
  dashboardCardTagBox: {
    fontWeight: 100,
    fontSize: "10pt",
  },
  // dashboardCardChip:{
  //   position: 'absolute',
  //   top: '16px',
  //   right: '16px',
  //   height: '20px',
  //   padding: '4px 0px',
  //   fontSize: '85%',
  //   backgroundColor: 'rgb(71, 130, 218)',
  //   color: 'rgb(255, 255, 255)',
  //   marginBottom: '16px',
  // },
  tagSucess: {
    color: "rgb(76, 175, 80)",
    fontWeight: 500,
    background: "rgba(76, 175, 80, 0.1)",
    padding: "4px",
    borderRadius: "3px",
    marginRight: "8px",
  },
  tagUnSucess: {
    color: "rgb(244, 67, 54)",
    fontWeight: 500,
    background: "rgba(244, 67, 54, 0.1)",
    padding: "4px",
    borderRadius: "3px",
    marginRight: "8px",
  },
  personalInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontFamily: "-apple-system",
    fontSize: 18,
    color: "#125e3c",
  },
  info: {
    fontSize: "1rem",
    fontWeight: 500,
    margin: 0,
    fontFamily: "-apple-system",
    display: "flex",
    alignItems: "center",
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginRight: "0.5rem",
    border: "none",
  },

  //Above theme are referenced to dashboard themes
  reportBox: {
    backgroundColor: "#F5FAF5",
    fontSize: "1rem",
    padding: "0 0 0 0",
    fontWeight: 400,
    wordWrap: "break-word",
    boxShadow: "0 2px 5px -1px rgba(0, 0, 0, 0.3)",
  },

  reportBoxHeading: {
    fontSize: "1.1rem",
    fontWeight: 500,

    textAlign: "center",
  },
  reportBoxBody200: {
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: 400,
  },
  reportBoxBody2001: {
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: 400,
    padding: 0,
  },
  reportBoxBody: {
    fontSize: "1rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  reportBoxSubBody: {
    fontSize: "1rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  dashboardButton: {
    minWidth: "6rem",
  },
  titleBig: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    textTransform: "uppercase",
    // color: "#0F8E3E",
  },
  titleSmall: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.7rem",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  badgeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0.5),
    fontSize: "75%",
    fontWeight: 700,
    lineHeight: 1,
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#0F8E3E",
    bottom: 0,
    marginTop: theme.spacing(2),
    position: "sticky",
  },
  badgeBoxAum: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: theme.spacing(0.5),
    fontSize: "75%",
    fontWeight: 700,
    lineHeight: 1,
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#0F8E3E",
    minWidth: "10vw",
    // marginTop: theme.spacing(2),
  },

  noDataSmiley: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },

  reportPaper: {
    padding: 20,
    margin: 20,
    minHeight: "20vh",
    width: "100%",
  },
  reportPaperSecondary: {
    padding: 20,
    margin: 20,
    minHeight: "18vh",
  },
}));

export default useStyles;

import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "5px",
    fontWeight: "500",
  },
  primaryButton: {
    background: "#3F51B5",
    color: "#ffffff",
    "&:hover": {
      background: "#1976d2",
    },
  },
  secondaryButton: {
    background: "#f50057",
    color: "#ffffff",
    "&:hover": {
      background: "#c51162",
    },
  },
}));

const CustomButton = ({ variant, color, onClick, children }) => {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      className={`${classes.button} ${
        color === "primary" ? classes.primaryButton : classes.secondaryButton
      }`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

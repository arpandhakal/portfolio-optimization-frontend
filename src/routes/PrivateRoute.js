import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/NavBar";
import { logoutUser } from "../action/authActions";

const PrivateRoute = ({ auth, children, dispatch }) => {
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div style={{ paddingTop: "70px" }}>{children}</div>
    </div>
  );
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);

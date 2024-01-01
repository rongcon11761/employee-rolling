import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];
  console.log(redirectUrl);
  return props.authenticated ? (
    props.children
  ) : (
    <Navigate to={`/login?redirectTo=${redirectUrl}`} />
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: !!state.authenticatedUser,
  };
};

export default connect(mapStateToProps)(PrivateRoute);

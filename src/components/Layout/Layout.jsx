import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../actions/actions";

const Layout = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.logout && props.logout();

    navigate("/");
  };

  return (
    <div className="layout-container">
      {props.user && (
        <div className="layout">
          <div className="navigation-bar">
            <ul className="navigation-list">
              <li className="navigation-item">
                <Link to="/" className="navigation-link">
                  Home
                </Link>
              </li>
              <li className="navigation-item">
                <Link to="/leaderboard" className="navigation-link">
                  Leader board
                </Link>
              </li>
              <li className="navigation-item">
                <Link to="/add" className="navigation-link">
                  New
                </Link>
              </li>
            </ul>
          </div>
          <div className="logout">
            <div className="current-username"> {props.user?.id}</div>
            <div className="logout-btn">
              <button
                className="btn btn-submit"
                type="submit"
                onClick={() => handleLogout()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="layout-body">{props.children}</div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: state.authenticatedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(handleLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

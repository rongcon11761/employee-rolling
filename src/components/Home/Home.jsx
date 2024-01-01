import { connect } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  return <Dashboard />;
};

const mapStateToProps = (state) => {
  return {
    user: state.authenticatedUser,
    users: state.users,
    questions: Object.values(state.questions).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  };
};

export default connect(mapStateToProps)(Home);

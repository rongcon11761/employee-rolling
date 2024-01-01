import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import Layout from "../Layout/Layout.jsx";
import Login from "../Login/Login.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import Home from "../Home/Home.jsx";
import LeaderBoard from "../LeaderBoard/LeaderBoard.jsx";
import NewPoll from "../NewPoll/NewPoll.jsx";
import PollPage from "../PollPage/PollPage.jsx";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";
import { getAppData } from "../../actions/actions.js";

const App = (props) => {
  useEffect(() => {
    props.getAppData();
  });

  return (
    <Layout>
      <Routes>
        <Route path={"login"} index={true} element={<Login />} />
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={"leaderboard"}
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path={"add"}
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route
          path={"question/:id"}
          element={
            <PrivateRoute>
              <PollPage />
            </PrivateRoute>
          }
        />
        <Route path={"notfound"} element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authenticatedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppData: () => {
      return dispatch(getAppData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

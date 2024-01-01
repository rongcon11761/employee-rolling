import { connect } from "react-redux";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="box-container new-question">
        <h2 className="title">New Questions</h2>
        <div className="box-layout">
          {props.questions
            ?.filter(
              (question) =>
                props.user &&
                !question.optionOne.votes.includes(props.user.id) &&
                !question.optionTwo.votes.includes(props.user.id)
            )
            .map((question) => (
              <div className="box-item" key={question.id}>
                <div className="information">
                  <p className="box-text name">{question.author}</p>
                  <p className="box-text time">
                    {moment(question.timestamp).format("hh:mm:A | MM/DD/YYYY")}
                  </p>
                </div>
                <Link to={`/question/${question.id}`}>
                  <button
                    className="btn-show"
                    onClick={() => navigate(`/question/${question.id}`)}
                  >
                    Show
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="box-container done-answered">
        <h2 className="title">Done</h2>
        <div className="box-layout">
          {props.questions
            ?.filter(
              (question) =>
                props.user &&
                (question.optionOne.votes.includes(props.user.id) ||
                  question.optionTwo.votes.includes(props.user.id))
            )
            .map((question) => (
              <div className="box-item" key={question.id}>
                <div className="information">
                  <p className="box-text name">{question.author}</p>
                  <p className="box-text time">
                    {moment(question.timestamp).format("hh:mm:A | MM/DD/YYYY")}
                  </p>
                </div>
                <Link to={`/question/${question.id}`}>
                  <button
                    className="btn-show"
                    onClick={() => navigate(`/question/${question.id}`)}
                  >
                    Show
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps)(DashBoard);

import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { handleSaveAnswerQuestion } from "../../actions/actions";

const PollPage = (props) => {
  const navigate = useNavigate();
  const param = useParams();

  const question = Object.values(props.questions).find(
    (question) => question.id === param.id
  );
  console.log(question);
  if (!question) {
    return <Navigate to={"/notfound"} />;
  }

  const user = Object.values(props.users).find(
    (user) => user.id === question.author
  );

  const handleQuestionOne = () => {
    props.addAnswer && props.addAnswer(question.id, "optionOne");
    navigate("/");
  };
  const handleQuestionTwo = () => {
    props.addAnswer && props.addAnswer(question.id, "optionTwo");
    navigate("/");
  };

  const calculatePercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  const hasVotedForOptionOne =
    props.user && question.optionOne.votes.includes(props.user?.id);
  const hasVotedForOptionTwo =
    props.user && question.optionTwo.votes.includes(props.user?.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  return (
    <div className="detail-page">
      <div className="title">
        <p className="current-user">Poll by {user?.id}</p>
      </div>
      <div className="user-image">
        <img src={user.avatarURL} alt="logo" />
      </div>
      <div>
        <h3>Would You Rather</h3>
      </div>
      <div className="button-info">
        <button
          disabled={hasVoted}
          className="btn-vote"
          onClick={handleQuestionOne}
        >
          {question.optionOne.text}{" "}
          {hasVoted && (
            <div>
              <p>{question.optionOne.votes.length}</p>
              <p>{calculatePercentage("optionOne", question)}</p>
            </div>
          )}
        </button>
        <button
          disabled={hasVoted}
          className="btn-vote"
          onClick={handleQuestionTwo}
        >
          {question.optionTwo.text}{" "}
          {hasVoted && (
            <div>
              <p>{question.optionTwo.votes.length}</p>
              <p>{calculatePercentage("optionTwo", question)}</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    users: state.users,
    user: state.authenticatedUser,
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: (questionId, answer) => {
      dispatch(handleSaveAnswerQuestion(questionId, answer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollPage);

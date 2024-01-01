import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSaveQuestion } from "../../actions/actions";

const NewPoll = (props) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addQuestion(optionOne, optionTwo);

    navigate("/");
  };

  return (
    <div className="new-poll" data-testid="new-poll">
      <div className="title">
        <h3>Would you rather</h3>
      </div>
      <div className="secondary-title">
        <span className={"text-secondary"}>Create Your Own Poll</span>
      </div>
      <div className="new-poll-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3">
            <p className="label" data-testid={"first-option-label"}>
              First Option
            </p>
            <input
              data-testid={"first-option-input"}
              type="text"
              value={optionOne}
              onChange={(event) => setOptionOne(event.target.value)}
              placeholder="Option One"
            />
          </div>

          <div className="mb-3">
            <p className="label" data-testid={"second-option-label"}>
              Second Option
            </p>
            <input
              data-testid={"second-option-input"}
              type="text"
              value={optionTwo}
              onChange={(event) => setOptionTwo(event.target.value)}
              placeholder="Option Two"
            />
          </div>
          <button
            type="submit"
            data-testid={"poll-submit-btn"}
            className="btn-submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (firstOption, secondOption) => {
      dispatch(handleSaveQuestion(firstOption, secondOption));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);

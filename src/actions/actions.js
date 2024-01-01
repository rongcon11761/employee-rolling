import {
  AUTHENTICATE_USER,
  GET_QUESTIONS,
  GET_USERS,
  LOGOUT,
  SAVE_ANSWERS_QUESTION,
  SAVE_QUESTION,
  SAVE_USER_ANSWERS,
  SAVE_USER_QUESTION,
} from "../utils/constant.js";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/DATA.js";

export const authenticateUserAction = (payload) => {
  return {
    type: AUTHENTICATE_USER,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const getUsersAction = (payload) => {
  return {
    type: GET_USERS,
    payload,
  };
};

export const getQuestions = (payload) => {
  return {
    type: GET_QUESTIONS,
    payload,
  };
};

export const saveUserQuestionAction = (payload) => {
  return {
    type: SAVE_USER_QUESTION,
    payload,
  };
};

export const saveUserAnswerAction = (payload) => {
  console.log(payload);
  return {
    type: SAVE_USER_ANSWERS,
    payload,
  };
};

export const saveQuestionAction = (payload) => {
  return {
    type: SAVE_QUESTION,
    payload,
  };
};

export const saveAnswerQuestionAction = (payload) => {
  return {
    type: SAVE_ANSWERS_QUESTION,
    payload,
  };
};

export const getAppData = () => {
  return async (dispatch) => {
    const [users, questions] = await Promise.all([
      _getUsers(),
      _getQuestions(),
    ]);
    const { users: users_1, questions: questions_1 } = {
      users,
      questions,
    };
    dispatch(getQuestions(questions_1));
    dispatch(getUsersAction(users_1));
  };
};

export function handleLogin(username, password) {
  return (dispatch, getState) => {
    const { users } = getState();

    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );

    if (user) {
      return dispatch(authenticateUserAction(user));
    } else {
      return dispatch(
        authenticateUserAction({
          user: null,
          errorMessage: "Wrong username or password",
        })
      );
    }
  };
}

export function handleLogout() {
  return (dispatch) => {
    return dispatch(logoutAction());
  };
}

export function handleSaveQuestion(optionOne, optionTwo) {
  return async (dispatch, getState) => {
    const { authenticatedUser } = getState();
    const user = authenticatedUser;
    const question = await _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: user.id,
    });

    dispatch(saveQuestionAction(question));
    dispatch(
      saveUserQuestionAction({
        author: question.author,
        id: question.id,
      })
    );
  };
}

export function handleSaveAnswerQuestion(questionId, answer) {
  return (dispatch, getState) => {
    const { authenticatedUser } = getState();
    const user = authenticatedUser;

    _saveQuestionAnswer({
      authedUser: user.id,
      qid: questionId,
      answer: answer,
    }).then(() => {
      dispatch(
        saveAnswerQuestionAction({
          author: user.id,
          qid: questionId,
          answer: answer,
        })
      );
      dispatch(
        saveUserAnswerAction({
          authedUser: user.id,
          qid: questionId,
          answer: answer,
        })
      );
    });
  };
}

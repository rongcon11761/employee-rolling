import {
  GET_USERS,
  SAVE_USER_ANSWERS,
  SAVE_USER_QUESTION,
} from "../utils/constant";

export default function receiveUsers(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_USER_QUESTION:
      return {
        ...state,
        [action.payload.author]: {
          ...state[action.payload.author],
          questions: state[action.payload.author].questions.concat(
            action.payload.id
          ),
        },
      };
    case SAVE_USER_ANSWERS:
      return {
        ...state,
        [action.payload.authedUser]: {
          ...state[action.payload.authedUser],
          answers: {
            ...state[action.payload.authedUser].answers,
            [action.payload.qid]: action.payload.answer,
          },
        },
      };
    default:
      return state;
  }
}

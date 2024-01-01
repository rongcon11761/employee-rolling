import {
  GET_QUESTIONS,
  SAVE_ANSWERS_QUESTION,
  SAVE_QUESTION,
} from "../utils/constant";

export default function questionsReducer(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case SAVE_ANSWERS_QUESTION:
      return {
        ...state,
        [action.payload.qid]: {
          ...state[action.payload.qid],
          [action.payload.answer]: {
            ...state[action.payload.qid][action.payload.answer],
            votes: state[action.payload.qid][
              action.payload.answer
            ].votes.concat(action.payload.author),
          },
        },
      };
    default:
      return state;
  }
}

import {combineReducers} from "redux";
import setAuthenticateUser from "./authenticateUser";
import receiveUsers from "./users";
import questionsReducer from "./questions";

export const reducer = combineReducers({
    authenticatedUser: setAuthenticateUser,
    users: receiveUsers,
    questions: questionsReducer,
})


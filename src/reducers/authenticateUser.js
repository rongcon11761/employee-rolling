import { AUTHENTICATE_USER, LOGOUT } from "../utils/constant";

export default function setAuthenticateUser(state = null, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

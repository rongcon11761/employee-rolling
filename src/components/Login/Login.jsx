import { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/actions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (props.authenticated) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    props.login(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-layout ">
      <div className="title">
        <h1>Employee Polls</h1>
      </div>
      <div className="image-container">
        <img
          alt=""
          className="users-image"
          src="https://afckstechnologies.in/img/public_blue_users.png"
        />
      </div>
      <div className="login-title">
        <h2>Login</h2>
      </div>
      <div className="login-form">
        <form className="new-tweet" onSubmit={(event) => handleSubmit(event)}>
          <div className="username">
            <p className="label" htmlFor="username">
              User
            </p>
            <input
              className="user-input"
              name="username"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              placeholder="User"
            ></input>
          </div>
          <div className="password">
            <p htmlFor="password">Password</p>
            <input
              className="user-input"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <button className="btn btn-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticatedUser !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(handleLogin(username, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

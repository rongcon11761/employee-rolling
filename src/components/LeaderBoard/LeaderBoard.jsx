import { connect } from "react-redux";

const LeaderBoard = (props) => {
  return (
    <table className="leader-board">
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {props.users?.map((user) => (
          <tr key={user.id}>
            <td>
              <div className="user-layout">
                <div className="user-image">
                  <img
                    src={user.avatarURL}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <p>{user.id}</p>
                </div>
              </div>
            </td>
            <td>{Object.keys(user.answers).length}</td>
            <td>{user.questions.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users).sort(
      (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
    ),
  };
};

export default connect(mapStateToProps)(LeaderBoard);

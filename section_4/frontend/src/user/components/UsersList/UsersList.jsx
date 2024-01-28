import UserItem from "../UserItem/UserItem";
import "./UsersList.css";

const UsersList = (props) => {
  return (
    <div className="center">
      <ul className="users-list">
        {props.users.length === 0 ? (
          <h2>No users found!</h2>
        ) : (
          props.users.map((user) => <UserItem key={user._id} {...user} />)
        )}
      </ul>
    </div>
  );
};

export default UsersList;

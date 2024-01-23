import UsersList from "../components/UsersList/UsersList";

import { USERS } from "../../DUMMY_DATA";

const Users = () => {
  return <UsersList users={USERS} />;
};

export default Users;

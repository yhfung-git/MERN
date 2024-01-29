import { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await sendRequest("http://localhost:5000/api/users");
      if (response !== null) setUsers(response.users);
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UsersList users={users} />
    </>
  );
};

export default Users;

import { useState, useEffect } from "react";

import UsersList from "../components/UsersList/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        setUsers(data.users);
      } catch (error) {
        setError(error.message || "Something went wrong, please try again.");
      }
      setIsLoading(false);
    };
    getUsers();
  }, []);

  const closeErrorModalHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={closeErrorModalHandler} />
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

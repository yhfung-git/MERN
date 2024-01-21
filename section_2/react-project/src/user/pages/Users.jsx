import UsersList from "../components/UsersList/UsersList";

const Users = () => {
  const USERS = [
    {
      id: Date.now().toString(),
      name: "Howard",
      image: "https://media.timeout.com/images/105481350/750/562/image.jpg",
      places: 3,
    },
  ];

  return (
    <>
      <h1 className="pageTitle">Users List</h1>
      <UsersList users={USERS} />
    </>
  );
};

export default Users;

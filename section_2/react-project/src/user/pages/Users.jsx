import UsersList from "../components/UsersList/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Howard",
    image: "https://media.timeout.com/images/105481350/750/562/image.jpg",
    places: 3,
  },
];

const Users = () => {
  return <UsersList users={USERS} />;
};

export default Users;

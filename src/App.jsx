import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data));
  }, []);
  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data));
  };
  const selectUser = user => {
    setUserSelected(user);
  };
  const deselectUser = () => {
    setUserSelected(null);
  };
  console.log(users);

  return (
    <div className="App">
      <UserForm
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}
      ></UserForm>
      <UsersList
        users={users}
        selectUser={selectUser}
        getUsers={getUsers}
      ></UsersList>
    </div>
  );
}

export default App;

import React from "react";

const UsersList = ({ users, selectUser, getUsers }) => {
  const deleteUser = id => {
    alert("Eliminando");
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
  };
  return (
    <ul className="user-list-container">
      <h1 className="user-list-title">Users List</h1>
      {users.map(user => (
        <li className="user-container" key={user.id}>
          <p>
            <b>Name:</b>
            {user.first_name} {user.last_name}
          </p>

          <p>
            <b>Email: </b>
            {user.email}
          </p>
          <p>
            <b>Birthday: </b>
            {user.birthday}
          </p>
          <button onClick={() => selectUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;

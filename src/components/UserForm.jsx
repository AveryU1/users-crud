import React, { useEffect, useState } from "react";
import axios from "axios";
const UserForm = ({ getUsers, userSelected, deselectUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  useEffect(() => {
    if (userSelected !== null) {
      setFirstName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setBirthday(userSelected.birthday);
    }
  }, [userSelected]);
  const submit = e => {
    e.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      birthday,
    };
    if (userSelected !== null) {
      alert("Actualizando");
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          user
        )
        .then(() => {
          getUsers();
          reset();
          deselectUser();
        });
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => {
          getUsers();
          reset();
        })
        .catch(error => console.log(error.response));
    }
    console.log(user);
  };
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setBirthday("");
  };
  const clear = () => {
    reset();
    deselectUser();
  };
  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h1>Login</h1>
        <div className="input-container">
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            placeholder="first name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            placeholder="last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="birthday"></label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </div>
        <button>Submit</button>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default UserForm;

import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

const AddFruit = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [fruit, setFruit] = useState({
    name: "",
    amount: 0,
    info: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFruit = {
      name: fruit.name,
      amount: fruit.amount,
      info: fruit.info,
      addedBy: userData.user.name,
    };

    axios
      .post("/api/fruits", newFruit, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/fruitlist"));

    setFruit({
      name: "",
      amount: 0,
      info: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFruit((oldFruit) => {
      return {
        ...oldFruit,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>Add Fruits Here!</h1>
      <form onSubmit={handleSubmit}>
        <label>Fruit Name: </label>
        <input
          type="text"
          name="name"
          value={fruit.name}
          required
          onChange={handleChange}
        />
        <br />
        <label>Amount: </label>
        <input
          type="text"
          name="amount"
          value={fruit.amount}
          onChange={handleChange}
        />
        <br />
        <label>Info: </label>
        <input
          type="text"
          name="info"
          value={fruit.info}
          onChange={handleChange}
        />
        <br />
        {userData.user ? (
          <input type="submit" value="Add Fruit!" />
        ) : (
          <p>You need to be logged in to Add Fruit!</p>
        )}
      </form>
    </div>
  );
};

export default AddFruit;

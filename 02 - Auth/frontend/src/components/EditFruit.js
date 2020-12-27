import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditFruit = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [fruit, setFruit] = useState({
    name: "",
    amount: 0,
    info: "",
  });

  useEffect(() => {
    axios
      .get("/api/fruits/" + match.params.id)
      .then((response) => setFruit(response.data));
  }, []);

  const fruitUpdate = () => {
    axios
      .put("/api/fruits/" + match.params.id, fruit, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/fruitlist"));
  };

  const fruitDelete = () => {
    axios
      .delete("/api/fruits/" + match.params.id, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/fruitlist"));
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
      <h1>Editing {fruit.name}</h1>
      <p>
        <b>ID: {fruit._id}</b>
      </p>
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
        <>
          <Button className="btn btn-warning" onClick={fruitUpdate}>
            Update Fruit
          </Button>
          <Button className="btn btn-danger" onClick={fruitDelete}>
            Delete Fruit
          </Button>
        </>
      ) : (
        <p>You need to log in to edit or delete!</p>
      )}
    </div>
  );
};

export default EditFruit;

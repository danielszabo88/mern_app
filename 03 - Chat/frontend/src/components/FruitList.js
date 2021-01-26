import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FruitList = () => {
  const [fruits, setFruits] = useState([]);
  const [fruitSearch, setFruitSearch] = useState("");

  useEffect(() => {
    axios.get("/api/fruits").then((response) => setFruits(response.data));
  }, []);

  return (
    <div>
      <h1>List of Current Fruits</h1>
      <input
        type="text"
        placeholder="Search Fruit..."
        onChange={(e) => {
          setFruitSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <br /><br />
      <ul style={{ listStyleType: "none" }}>
        {fruits
          .filter((fruit) => {
            if (fruit.name.toLowerCase().includes(fruitSearch.toLowerCase())) {
              return fruit;
            }
          })
          .map((fruit) => {
            return (
              <li key={fruit._id}>
                <Link to={`/fruit/${fruit._id}`}>
                  <b>{fruit.name}</b>
                </Link>{" "}
                ({fruit.amount}) - {fruit.info}&nbsp;[Added by {fruit.addedBy}]
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FruitList;

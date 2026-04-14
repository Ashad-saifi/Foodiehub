import React, { useState, useEffect } from "react";
import { getRestaurants } from "../services/api";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      {restaurants.map((r, index) => (
        <p key={index}>{r.name}</p>
      ))}
    </div>
  );
};

export default Home;
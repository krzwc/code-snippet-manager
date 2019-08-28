import React, { useEffect, useState } from "react";
import ENDPOINT from "../../utils/endpoint";
import { Tech } from "./types";

const initialState: Tech = [];

export default () => {
  const [tech, setTech] = useState(initialState);

  const fetchAPI = async () => {
    try {
      const req = await fetch(ENDPOINT);
      const res = await req.json();
      const results = res.data.technologies;
      setTech(results);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      {tech.map(techName => (
        <p key={techName._id}>{techName.name}</p>
      ))}
    </div>
  );
};

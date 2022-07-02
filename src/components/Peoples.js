import React from "react";
import { useQuery } from "react-query";
import People from "./People";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people");
  return res.json();
};

const Peoples = () => {
  const { data, status } = useQuery("people", fetchPeople);
  console.log(data);

  return (
    <div>
      <h3>People</h3>
      {status === "loading" ? <p>Loading...</p> : ""}
      {status === "error" ? <p>Something went wrong.</p> : ""}
      {status === "success" ? (
        <div>
          {data.results.map((people) => (
            <People key={people.name} people={people} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Peoples;

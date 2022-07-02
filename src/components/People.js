import React from "react";

const People = ({ people }) => {
  return (
    <div className="card">
      <h3>{people.name}</h3>
      <p>Gender - {people.gender}</p>
      <h3>Birth year - {people.birth_year}</h3>
    </div>
  );
};

export default People;

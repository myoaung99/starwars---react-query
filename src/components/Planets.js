import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  const [key, { page }] = queryKey;
  if (!page) {
    return [];
  }
  const res = await fetch(`http://swapi.dev/api/planets?page=${page}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", { page }], fetchPlanets, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h3>Planets</h3>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Previous page
      </button>
      <span>{page}</span>
      <button onClick={() => setPage((prev) => (!data.next ? prev : prev + 1))}>
        Next page
      </button>
      {status === "loading" ? <p>Loading...</p> : ""}
      {status === "error" ? <p>Something went wrong.</p> : ""}
      {status === "success" && data.results ? (
        <>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Planets;

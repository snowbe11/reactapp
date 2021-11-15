import React, { useState, useEffect } from "react";
import "./style.css";

const fetchRequestRank = async () => {
  console.log(`request get rank`);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let reply = await fetch("/api/rank/", options);
  let json = await reply.json();

  //console.log(json);

  if (json.status === "success") {
    return json.payload;
  } else {
    return [];
  }
};

export default function Rank() {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    fetchRequestRank().then((result) => {
      setRank(result);
    });
  }, []);

  return (
    <div className="rank-container">
      {rank.map((e) => {
        return (
          <div className="rank-container-element">
            {e.name}, {e.score}
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./styles.css";

const Search = ({ query }) => {
  const [searchQuery, setSeachQuery] = useState(query || "");
  const navigate = useNavigate(); // Gunakan useNavigate

  useEffect(() => {
    navigate(`/${searchQuery}`);
  }, [searchQuery, navigate]);

  return (
    <div className="container-search mb-4">
      <Form.Label>Name or number</Form.Label>
      <div className="container-input-btn">
        <input
          onChange={(e) => setSeachQuery(e.currentTarget.value)}
          value={searchQuery}
          placeholder="Ex. Bulbasaur"
        />
        {searchQuery !== "" && (
          <button onClick={() => setSeachQuery("")} className="btn-clear">
            <FontAwesomeIcon icon={faTimes} color={"white"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;

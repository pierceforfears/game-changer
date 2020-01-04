import React from "react";
import "./style.css";

function Results(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.title} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Title:</strong> {props.title}
          </li>
          <li>
            <strong>Description:</strong> {props.description}
          </li>
          <li>
            <strong>Price:</strong> {props.price}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Results;

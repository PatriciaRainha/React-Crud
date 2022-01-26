import React from "react";

const Card = (props) => {
  return (
    <div
      className="card"
      style={{ maxWidth: "50rem", cursor: "pointer" }}
      onClick={props.onClick}
    >
      <h5 className="card-header card-title bg-primary text-white mb-3">
        {props.title}
      </h5>
      <div className="card-body text-dark">
        <blockquote className="blockquote mb-0">
          <p>{props.text}</p>
          <footer className="blockquote-footer">{props.footer}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Card;

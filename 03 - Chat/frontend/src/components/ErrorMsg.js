import React from "react";

const ErrorMsg = (props) => {
  return (
    <div style={{ padding: "20px", margin: "10px", border: "1px solid red" }}>
      <span style={{ color: "red" }}>
        <b>{props.msg}</b>
      </span>
    </div>
  );
};

export default ErrorMsg;

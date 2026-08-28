import React from "react";
import "../../images/LoaderStyle.css";

// Displays the shared loading indicator during asynchronous work.
const Loader = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

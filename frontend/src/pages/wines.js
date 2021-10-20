import React from "react";
import Wines from "../components/Wines/Wines";

function WinesPage(props) {
  return (
    <>
      <Wines props={props} />
    </>
  );
}

export default WinesPage;

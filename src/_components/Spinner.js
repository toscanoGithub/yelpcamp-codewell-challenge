import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
  return (
    <div style={{ display: "block" }}>
      <ClipLoader color="green" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
  return (
      <ClipLoader color="green" loading={loading} size={50} />
  );
};

export default Spinner;

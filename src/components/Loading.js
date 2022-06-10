import React from "react";
import Typography from "@mui/material/Typography";
import "../scss/Loading.scss";

const Loading = () => {
  return (
    <>
      <div className="container">
        <div className="pokeball">
          <div className="pokeball-center"></div>
        </div>
        <Typography className="loadingText" variant="h6">
          Loading...
        </Typography>
      </div>
    </>
  );
};

export default Loading;

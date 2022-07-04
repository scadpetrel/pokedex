import React from "react";
import Typography from "@mui/material/Typography";
import "../scss/Loading.scss";
import { LoadingContainer } from "./LoadingStyles";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingContainer className="container">
        <div className="pokeball">
          <div className="pokeball-center"></div>
        </div>
        <Typography className="loadingText" variant="h6">
          Loading...
        </Typography>
      </LoadingContainer>
    </LoadingContainer>
  );
};

export default Loading;

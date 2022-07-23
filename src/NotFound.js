import React, { useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import "./scss/Loading.scss";
import { LoadingContainer } from './components/LoadingStyles';

import { NotificationContext } from "./context/notificationContext";

const NotFound = () => {
  let location = useLocation();
  const history = useNavigate();
  console.log(location.pathname)

  const {notification} = useContext(NotificationContext);
  console.log(notification)

  const handleHome = () => {
    history('/')
  }
    return (
      <LoadingContainer style={{ height: '100vh'}}>
        <div className="container">
          <div className="pokeball-404">
            <div className="pokeball-center"></div>
          </div>
          <Typography className="loadingText" variant="h6">
            {/* {location.pathname === '/404-pokemon' ? 'Pokemon not in database' : 'Nothing was found'} */}
            {notification && `${notification.title} ${notification.message}` || 'Nothing was found'}
          </Typography>
          <Button variant="contained" onClick={handleHome}>Return Home</Button>
        </div>
      </LoadingContainer>
    );
}

export default NotFound

import { createContext, useState } from 'react';

export const NotificationContext = createContext({
  notification: null,
  displayMessage: function(notificationData) {},
});

// {
//   message: 'Nothing was found',
//   setMessage: function () {}
// }

function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function activeMessageHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  const context = {
    notification: activeNotification,
    displayMessage: activeMessageHandler,
  }

  return (
  <NotificationContext.Provider value={context}>
    {props.children}
  </NotificationContext.Provider>
  )
}

export default NotificationContextProvider;
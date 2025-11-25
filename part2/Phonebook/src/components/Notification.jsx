const Notification = ({ message, type }) => {
  if (type === null) {
    return null;
  } else if (type === 'success') {
    return <div className="messageSuccess">{message}</div>;
  } else {
    return <div className="messageFailure">{message}</div>;
  }

};

export default Notification;

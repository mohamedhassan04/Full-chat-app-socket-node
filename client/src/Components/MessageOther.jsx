import React from "react";

const MessageOther = ({ props1 }) => {
  return (
    <div className="other-message-container">
      <div className="conversation-container">
        <p className="con-icon">{props1?.sender?.name[0]}</p>
        <div className="other-text-content">
          <p className="con-title">{props1?.sender?.name}</p>
          <p className="con-lastMessage">{props1.content}</p>
          <p className="self-timeStamp">12:00am</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOther;

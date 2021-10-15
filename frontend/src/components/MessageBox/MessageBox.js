import React from "react";
import { MessageContainer } from "./MessageBoxElements";

function MessageBox(props) {
  return (
    <MessageContainer className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </MessageContainer>
  );
}

export default MessageBox;

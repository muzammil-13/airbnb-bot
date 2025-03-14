import * as React from "react"
import {useState} from 'react';
import '../styles/chat.css'
import Chatbot from 'react-chatbot-kit'
import ActionProvider from '../ActionProvider'
import MessageParser from '../MessageParser'
import config from '../config'

import 'react-chatbot-kit/build/main.css'

function ChatComponent() {
  return (
    <div className="chat-container">
      <Chatbot 
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser} />
    </div>
  )
}

export default ChatComponent;

import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Airbnb Assistant",
  initialMessages: [
    createChatBotMessage(`Welcome! I'm here to help you with your Airbnb needs. Ask me about bookings, hosting, or general support!`)
  ]
}

export default config

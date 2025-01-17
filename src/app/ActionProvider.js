import OpenAI from "openai"

const openAI = new OpenAI({
    apiKey: process.env.apiKey,
    baseURL: "https://api.aimlapi.com",
    dangerouslyAllowBrowser: true
})
class ActionProvider {
    createChatBotMessage
    setState
    createClientMessage
    stateRef
    createCustomMessage
    
    constructor(
      createChatBotMessage,
      setStateFunc,
      createClientMessage,
      stateRef,
      createCustomMessage,
      ...rest
    ) {
      this.createChatBotMessage = createChatBotMessage
      this.setState = setStateFunc
      this.createClientMessage = createClientMessage
      this.stateRef = stateRef
      this.createCustomMessage = createCustomMessage
    }

    callGenAI = async (prompt) => {
        const chatCompletion = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role:"system", content: "You are Credit Card Advisor. Give short and precise answers with exact card and bank name"},
                {role: "user", content: prompt}
            ],
            temperature: 0.5,
            max_tokens: 50
        });
        return chatCompletion.choices[0].message.content
    }

    timer = ms => new Promise(res => setTimeout(res, ms));
    
    generateResponseMessages = async (userMessage)  => {
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        let numberOfLines = responseFromGPT.split("\n").length;
        for(let i=0; i<numberOfLines; i++){
            const msg = responseFromGPT.split("\n")[i];
            if(msg.length){
                message = this.createChatBotMessage(msg);
                this.updateChatbotState(message);
            }
            await this.timer(1000);
        }
    }

    respond = (message) => {
        this.generateResponseMessages(message)
    }

    updateChatbotState = (message) => {
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }

  }


  
  export default ActionProvider;
  
import OpenAI from "openai"

const openAI = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    // baseURL: "https://api.aimlapi.com", // ⚠️ Remove this line if using an official OpenAI key (sk-...)
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
        try {
            const chatCompletion = await openAI.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "You are an Airbnb Support Assistant. Provide helpful, concise answers about bookings, hosting, policies, and general Airbnb support. Focus on being practical and specific."},
                    {role: "user", content: prompt}
                ],
                temperature: 0.7,
                max_tokens: 150
            });
            return chatCompletion.choices[0].message.content;
        } catch (error) {
            if (error.status === 403) {
                console.error("🚨 API Quota Exceeded: Your API key has run out of credits. Please check your provider dashboard.");
            } else if (error.status === 500) {
                console.error("🚨 API Error (500): Likely an invalid API key or provider mismatch. If using an official OpenAI key, remove 'baseURL' in ActionProvider.js.");
            }
            console.error("Error calling AI API:", error);
            throw error; 
        }
    }
    

    timer = ms => new Promise(res => setTimeout(res, ms));
    
    generateResponseMessages = async (userMessage)  => {
        try {
            const responseFromGPT = await this.callGenAI(userMessage);
            const lines = responseFromGPT.split("\n");
            
            for (const msg of lines) {
                if (msg.trim().length) {
                    const message = this.createChatBotMessage(msg);
                    this.updateChatbotState(message);
                    await this.timer(1000);
                }
            }
        } catch (error) {
            const errorMessage = this.createChatBotMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.");
            this.updateChatbotState(errorMessage);
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
  
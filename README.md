# Airbnb Support Assistant Chatbot

An intelligent chatbot built with Next.js, React, and OpenAI's GPT API to provide instant Airbnb support assistance.

## Features

- Real-time chat interface using react-chatbot-kit
- AI-powered responses using GPT-3.5-turbo
- Instant help with:
  - Booking processes
  - Hosting guidelines
  - Airbnb policies
  - General platform support
- Clean, modern UI with Geist typography
- Natural conversation flow with timed responses

## Tech Stack

- Next.js 13+ (React framework)
- OpenAI GPT API
- react-chatbot-kit
- Geist Font
- Environment variables for secure API handling

## Quick Start

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` and add your OpenAI API key:

```bash
NEXT_PUBLIC_apiKey=your-api-key-here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](command:_cody.vscode.open?%22http%3A%2F%2Flocalhost%3A3000%22) to view the chatbot

## Usage

The chatbot provides instant responses to queries about:

* Booking procedures and issues
* Host guidelines and best practices
* Platform policies and rules
* Account management
* Payment processes
* Safety and security measures

## Development

The project structure:

* `src/app/components/ChatComponent.js` - Main chat interface
* `src/app/ActionProvider.js` - Handles AI integration and responses
* `src/app/MessageParser.js` - Processes user inputs
* `src/app/config.js` - Chatbot configuration

## Deployment

Deploy easily with [Vercel](command:_cody.vscode.open?%22https%3A%2F%2Fvercel.com%22):

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Contributing

Contributions welcome! Feel free to submit PRs for:

* New features
* Bug fixes
* Documentation improvements
* UI enhancements

## License

MIT License

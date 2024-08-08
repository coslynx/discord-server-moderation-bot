<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-server-moderation-bot
</h1>
<h4 align="center">Discord moderation bot with advanced features for server management.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" alt="Language: TypeScript">
  <img src="https://img.shields.io/badge/Framework-Discord.js-red" alt="Framework: Discord.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-blue" alt="Database: MongoDB">
  <img src="https://img.shields.io/badge/AI-OpenAI%20API-black" alt="AI: OpenAI API">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-server-moderation-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-server-moderation-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-server-moderation-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses "ModerationBot," a Discord bot designed for server moderation and management. It leverages advanced features like automated message filtering, role management, moderation commands, user logging, customizable rules, and more. ModerationBot helps cultivate a positive and organized environment for your Discord communities.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | Architecture   | The codebase follows a modular architecture, separating different functionalities into distinct modules for improved organization and maintainability.     |
| 📄 | Documentation  | This README provides a comprehensive overview of the bot's features, installation, usage, and development details.  |
| 🔗 | Dependencies   | The bot utilizes essential libraries and packages like Discord.js, Mongoose, OpenAI API, and other tools for handling Discord interactions, database management, and advanced AI functionality. |
| 🧩 | Modularity     |  Code is structured into modules for commands, utilities, events, models, and services, promoting code reusability and ease of maintenance. |
| 🧪 | Testing        |  Unit tests are implemented using Jest to ensure the bot's functionality is correct and reliable.        |
| ⚡️  | Performance    |  The bot's design prioritizes performance, employing efficient data structures and algorithms for responsiveness. |
| 🔐 | Security       |  Security measures include input validation, data sanitization, and secure API handling to protect user data and server integrity. |
| 🔀 | Version Control|  The project uses Git for version control, facilitating collaboration and managing code changes.  |
| 🔌 | Integrations   | The bot integrates with the Discord API, MongoDB database, and OpenAI API for seamless functionality. |
| 📶 | Scalability    | The architecture is designed to scale efficiently, allowing for handling a large number of users and messages. |

## 📂 Structure

```
├── .env
├── package.json
├── tsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── Dockerfile
├── .github
│   └── workflows
│       └── main.yml
└── src
    ├── index.ts
    ├── commands
    │   ├── moderation.ts
    │   ├── roles.ts
    │   ├── logging.ts
    │   └── customRules.ts
    ├── utils
    │   ├── config.ts
    │   ├── database.ts
    │   ├── nlp.ts
    │   ├── discord.ts
    │   └── logger.ts
    ├── events
    │   ├── messageCreate.ts
    │   ├── guildMemberAdd.ts
    │   └── guildMemberRemove.ts
    ├── models
    │   ├── user.ts
    │   ├── guild.ts
    │   └── message.ts
    └── services
        ├── moderationService.ts
        ├── roleService.ts
        ├── loggingService.ts
        └── customRulesService.ts
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js (v18 or later)
- npm (or yarn)
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/spectra-ai-codegen/discord-server-moderation-bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd discord-server-moderation-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     DISCORD_TOKEN=your_discord_bot_token
     MONGO_URI=mongodb://your_mongodb_host:27017/your_database_name
     OPENAI_API_KEY=your_openai_api_key
     ```
5. Start the bot:
   ```bash
   npm start
   ```
   
## 🏗️ Usage

To use ModerationBot, follow these steps:

1. Invite the bot to your server:
   - Obtain the bot's invite link from the Discord developer portal (see the [Discord Developer Portal](https://discord.com/developers/applications) for instructions).
2. Grant permissions:
   - When inviting the bot, ensure you grant it the necessary permissions for moderation, such as "Kick Members," "Ban Members," "Manage Channels," and "Manage Roles."
3. Configure settings (optional):
   - Use the bot's commands or a custom dashboard (if implemented) to set up custom rules, filtering options, and other configurations.

## 🌐 Hosting

### 🚀 Deployment Instructions

1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy to a cloud platform:
   - Heroku, AWS, Google Cloud, or any other hosting platform of your choice.  
3. Set up environment variables on the hosting platform:
   - Ensure the environment variables `DISCORD_TOKEN`, `MONGO_URI`, and `OPENAI_API_KEY` are correctly set in the hosting environment.

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 👏 Authors

- Author Name - [Spectra.codes](https://spectra.codes)
- Creator Name - [DRIX10](https://github.com/Drix10)

<p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>
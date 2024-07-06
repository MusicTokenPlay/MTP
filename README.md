# MTPs - Telegram Clicker Game

MTPs is a simple clicker game designed to run as a Telegram bot deployed on Heroku. Players can earn resources by clicking or performing specific actions within the game.

## Installation

To deploy the project on Heroku and set up the Telegram bot, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
Set up Heroku:

Create a new application on Heroku.
Install the Heroku CLI for managing your application via the command line.
Configure Telegram Bot:

Create a new bot via BotFather in Telegram and obtain your bot token.
In your Heroku settings, add an environment variable TELEGRAM_TOKEN with your bot token.

Install dependencies:
bash
npm install

Usage
To start the MTPs Telegram bot on Heroku, run the following command:
bash
heroku ps:scale worker=1

Features
Simple clicker interface allowing users to earn resources.
Integration with Telegram for accessibility via messenger.
License
This project is licensed under the MIT License - see the LICENSE file for details.
markdown

### Как использовать этот `README.md`:
1. **Копирование**: Скопируйте весь текст выше.
2. **Создание файла**: Создайте новый файл с названием `README.md` в корне вашего репозитория.
3. **Вставка содержимого**: Вставьте скопированный текст в файл `README.md`.
4. **Сохранение и загрузка**: Загрузите файл `README.md` в ваш репозиторий на GitHub, нажав на кнопку "Commit" или "Зафиксировать изменения".


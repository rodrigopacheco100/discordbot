import { Client, Message } from 'discord.js';
import config from './config';
import avatar from './messages/avatar';
import disconnect from './messages/disconnect';
import jonas from './messages/jonas';
import kick from './messages/kick';
import { play, skip } from './messages/play';

const { prefix, token } = config;

const app = new Client();

app.on('message', (message: Message) => {
  if (message.content.charAt(0) === prefix) {
    const msg = message.content.substr(1).toLowerCase();
    const [command, ...rest] = msg.split(' ');
    const after = rest.join(' ');

    switch (command) {
      case 'jonas':
        jonas(message);
        break;

      case 'avatar':
        avatar(message);
        break;

      case 'kick':
        kick(message);
        break;

      case 'play':
        play(message, after);
        break;

      case 'disconnect':
      case 'dc':
        disconnect(message);
        break;

      case 'skip':
        skip();
        break;

      default:
    }
  }
});

app.on('ready', () => {
  console.log(`Logged in`);
});

app.login(token);

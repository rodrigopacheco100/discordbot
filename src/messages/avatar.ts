import { Message } from 'discord.js';

const avatar = (message: Message) => {
  message.channel.send(message.author.displayAvatarURL());
};

export default avatar;

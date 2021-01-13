import { Message } from 'discord.js';

const disconnect = (message: Message) => {
  message.channel.send('Saindo...');
  message.member?.voice.channel?.leave();
};

export default disconnect;

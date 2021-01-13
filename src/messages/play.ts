import { Message, StreamDispatcher, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import {
  ChannelSearchResult,
  LiveSearchResult,
  PlaylistSearchResult,
  VideoSearchResult,
  search as ytSearch,
} from 'yt-search';

type SearchResult =
  | VideoSearchResult
  | LiveSearchResult
  | PlaylistSearchResult
  | ChannelSearchResult;

let connection: VoiceConnection | null = null;
let queue: SearchResult[] = [];
let isPlaying = false;
let currentMusic: StreamDispatcher | undefined;

const searchMusicOnYoutube = async (message: Message, after: string) => {
  try {
    ytSearch(after, (err, data) => {
      if (!err) {
        const music = data.all[0];
        message.channel.send(`\`\`\`${music.title} adicionado na fila.\`\`\``);
        addMusicToQueue(music, message);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const addMusicToQueue = async (
  music: SearchResult,
  message: Message,
): Promise<void> => {
  if (!message.member?.voice.channel) {
    message.reply(
      '```Você precisa estar em um canal de voz para reproduzir uma música```',
    );
    return;
  }

  connection = await message.member.voice.channel.join();

  queue.push(music);

  if (!isPlaying) playMusic(message);
};

const playMusic = async (message: Message) => {
  if (queue[0]) {
    currentMusic = connection?.play(await ytdl(queue[0].url), { type: 'opus' });
    message.channel.send(`\`\`\`${queue[0].title} está tocando agora.\`\`\``);
    isPlaying = true;

    currentMusic?.on('finish', async () => {
      isPlaying = false;
      queue.shift();
      await playMusic(message);
    });

    currentMusic?.on('close', () => {
      isPlaying = false;
      queue = [];
    });
  }
};

const skip = () => {
  currentMusic?.end();
};

export { searchMusicOnYoutube as play, skip };

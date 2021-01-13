"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skip = exports.play = void 0;
var ytdl_core_discord_1 = __importDefault(require("ytdl-core-discord"));
var yt_search_1 = require("yt-search");
var connection = null;
var queue = [];
var isPlaying = false;
var currentMusic;
var searchMusicOnYoutube = function (message, after) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            yt_search_1.search(after, function (err, data) {
                if (!err) {
                    var music = data.all[0];
                    message.channel.send("```" + music.title + " adicionado na fila.```");
                    addMusicToQueue(music, message);
                }
            });
        }
        catch (err) {
            console.error(err);
        }
        return [2 /*return*/];
    });
}); };
exports.play = searchMusicOnYoutube;
var addMusicToQueue = function (music, message) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel)) {
                    message.reply('```Você precisa estar em um canal de voz para reproduzir uma música```');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, message.member.voice.channel.join()];
            case 1:
                connection = _b.sent();
                queue.push(music);
                if (!isPlaying)
                    playMusic(message);
                return [2 /*return*/];
        }
    });
}); };
var playMusic = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!queue[0]) return [3 /*break*/, 4];
                if (!(connection === null || connection === void 0)) return [3 /*break*/, 1];
                _a = void 0;
                return [3 /*break*/, 3];
            case 1:
                _c = (_b = connection).play;
                return [4 /*yield*/, ytdl_core_discord_1.default(queue[0].url)];
            case 2:
                _a = _c.apply(_b, [_d.sent(), { type: 'opus' }]);
                _d.label = 3;
            case 3:
                currentMusic = _a;
                message.channel.send("```" + queue[0].title + " est\u00E1 tocando agora.```");
                isPlaying = true;
                currentMusic === null || currentMusic === void 0 ? void 0 : currentMusic.on('finish', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                isPlaying = false;
                                queue.shift();
                                return [4 /*yield*/, playMusic(message)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                currentMusic === null || currentMusic === void 0 ? void 0 : currentMusic.on('close', function () {
                    isPlaying = false;
                    queue = [];
                });
                _d.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var skip = function () {
    currentMusic === null || currentMusic === void 0 ? void 0 : currentMusic.end();
};
exports.skip = skip;

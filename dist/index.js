"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var config_1 = __importDefault(require("./config"));
var avatar_1 = __importDefault(require("./messages/avatar"));
var disconnect_1 = __importDefault(require("./messages/disconnect"));
var jonas_1 = __importDefault(require("./messages/jonas"));
var kick_1 = __importDefault(require("./messages/kick"));
var play_1 = require("./messages/play");
var prefix = config_1.default.prefix, token = config_1.default.token;
var app = new discord_js_1.Client();
app.on('message', function (message) {
    if (message.content.charAt(0) === prefix) {
        var msg = message.content.substr(1).toLowerCase();
        var _a = msg.split(' '), command = _a[0], rest = _a.slice(1);
        var after = rest.join(' ');
        switch (command) {
            case 'jonas':
                jonas_1.default(message);
                break;
            case 'avatar':
                avatar_1.default(message);
                break;
            case 'kick':
                kick_1.default(message);
                break;
            case 'play':
                play_1.play(message, after);
                break;
            case 'disconnect':
            case 'dc':
                disconnect_1.default(message);
                break;
            case 'skip':
                play_1.skip();
                break;
            default:
        }
    }
});
app.on('ready', function () {
    console.log("Logged in");
});
app.login(token);

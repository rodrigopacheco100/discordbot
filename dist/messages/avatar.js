"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var avatar = function (message) {
    message.channel.send(message.author.displayAvatarURL());
};
exports.default = avatar;

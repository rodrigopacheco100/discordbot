"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disconnect = function (message) {
    var _a, _b;
    message.channel.send('Saindo...');
    (_b = (_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel) === null || _b === void 0 ? void 0 : _b.leave();
};
exports.default = disconnect;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kick = function (message) {
    var user = message.mentions.users.first();
    if (user && message.guild) {
        var member = message.guild.member(user);
        if (member) {
            member.send('Vlw flw cornão (☞ﾟヮﾟ)☞');
            member
                .kick('Optional reason that will display in the audit logs')
                .then(function () {
                message.reply("Successfully kicked " + user.tag);
            })
                .catch(function (err) {
                message.reply('I was unable to kick the member');
                console.error(err);
            });
        }
        else {
            message.reply("That user isn't in this guild!");
        }
    }
    else {
        message.reply("You didn't mention the user to kick!");
    }
};
exports.default = kick;

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {
    // if (receivedMessage.author.username.toString().startsWith("Mudamaid")) {
    //     var k_value = getKakeraValue(receivedMessage);

    //     if(k_value)
    //     {
    //         receivedMessage.channel.send(k_value);
    //     }
    // }
    
    if (!receivedMessage.author.username.toString().startsWith("Auto Kakera Lookup")) {
        receivedMessage.channel.send("$im " + receivedMessage.cleanContent);
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    let serverId = reaction.message.channel["id"];
    if (serverId == kakera_test_server
        && user.username.startsWith("Mudamaid")
        && reaction.emoji.name === "😍") {

        let charName = getCharacterName(reaction.message);
        if (charName) {
            client.channels.get(kakera_lookup_server).send("$im " + charName);
        }
    }
})

let getKakeraValue = (message) => {
    let serverId = message.channel["id"];
    if (serverId == kakera_lookup_server
        && message.author.username.toString().startsWith("Mudamaid")) {

        if (message.embeds.length > 0) {
            var kakera_value = message.embeds[0].description.toString();
            var myRegexp = /(?:\*\*)(?<kvalue>\d+)(?:\*\*<:kakera:)/g;
            var match = myRegexp.exec(kakera_value);

            if (match) {
                console.log(message.embeds[0].author.name + " is worth " + match.groups['kvalue'] + " kakera");
                return "**" + message.embeds[0].author.name + "** is worth **" + match.groups['kvalue'] + "** kakera.";
            }
        }
    }
}

let getCharacterName = (message) => {
    if (message.embeds.length > 0) {
        return message.embeds[0].author.name;
    }
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "ADD BOT SECRET TOKEN HERE";
kakera_test_server = "TEST SERVER";
kakera_lookup_server = "LOOKUP SERVER";
client.login(bot_secret_token)

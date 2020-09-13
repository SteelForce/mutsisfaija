const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('vittu toimii trueeee!')
});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);

    } else if (command == 'tonttupallo'){
        client.commands.get('tonttupallo').execute(message, args);

    } else if (command == 'tonttufeedaa'){
        client.commands.get('tonttufeedaa').execute(message, args);
    }
});
client.login(config.token);
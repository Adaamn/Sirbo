require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { DISCORD_TOKEN, CLIENT_ID } = process.env;  // Removed GUILD_ID as it's no longer needed for global commands

// Client setup with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages, 
    ],
});

// Code for registering commands
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'userinfo',
        description: 'Displays information about the user account. 👤',
        options: [
            {
                name: 'user',
                type: 6,  
                description: 'The user you want to get information about',
                required: false,
            },
        ],
    },
    {
        name: 'help',
        description: 'Displays a list of bot commands. ℹ️',
    },
    {
        name: 'ban',
        description: 'Ban a user from this server.',
        options: [
            {
                name: 'target',
                type: 6,  
                description: 'The user you want to ban',
                required: true,
            },
        ],
    },
    {
        name: 'kick',
        description: 'Kick a user from this server.',
        options: [
            {
                name: 'target',
                type: 6,  
                description: 'The user you want to kick',
                required: true,
            },
        ],
    },
    {
        name: 'crypto',
        description: 'Get the current price of a cryptocurrency. 💰',
        options: [
            {
                name: 'coin',
                type: 3,  // STRING type
                description: 'The cryptocurrency name (e.g. bitcoin, ethereum)',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function registerCommands() {
    try {
        console.log('Starting command registration.');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),  // Changed to global commands
            { body: commands }
        );

        console.log('Commands were successfully registered globally!');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is online!`);
    
    // Setting up Rich Presence
    client.user.setPresence({
        activities: [
            {
                name: '/help',
                type: ActivityType.Watching,  
            },
        ],
        status: 'dnd',  
    });

    registerCommands();
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        console.log(`Command '${interaction.commandName}' was triggered by user ${interaction.user.tag}!`);

        if (interaction.commandName === 'userinfo') {
            await require('./commands/userinfo').execute(interaction);
        }

        if (interaction.commandName === 'help') {
            await require('./commands/help').execute(interaction);
        }

        if (interaction.commandName === 'ban') {
            await require('./commands/ban').execute(interaction);
        }

        if (interaction.commandName === 'kick') {
            await require('./commands/kick').execute(interaction);
        }

        if (interaction.commandName === 'crypto') {
            await require('./commands/crypto').execute(interaction);
        }
    }
});

// Bot login
client.login(DISCORD_TOKEN);

require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Nastavení klienta s potřebnými intenty
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,  // Tento intent musí být povolen
        GatewayIntentBits.DirectMessages, // Přidání možnosti interakce v DM
    ],
});

// Kód pro registraci příkazů
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'userinfo',
        description: 'Zobrazí informace o uživatelském účtu. 👤',
        options: [
            {
                name: 'user',
                type: 6,  // Typ pro uživatele
                description: 'Uživatel, o kterém chcete získat informace',
                required: false,
            },
        ],
    },
    {
        name: 'help',
        description: 'Zobrazí seznam příkazů bota. ℹ️',
    },
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function registerCommands() {
    try {
        console.log('Začínám registraci příkazů.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('Příkazy byly úspěšně registrovány!');
    } catch (error) {
        console.error('Chyba při registraci příkazů:', error);
    }
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} je online!`);
    
    // Nastavení Rich Presence
    client.user.setPresence({
        activities: [
            {
                name: '/help', // Název hry/aktivity
                type: ActivityType.Watching,  // Typ aktivity
            },
        ],
        status: 'dnd',  // Status bota, může být 'online', 'idle', 'dnd' nebo 'invisible'
    });

    registerCommands();  // Zavolání funkce pro registraci příkazů
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        console.log(`Příkaz '${interaction.commandName}' byl aktivován uživatelem ${interaction.user.tag}!`); // Logování příkazu

        if (interaction.commandName === 'userinfo') {
            // Info o uživatelském účtu
            await require('./commands/userinfo').execute(interaction);
        }

        if (interaction.commandName === 'help') {
            // Seznam příkazů
            await require('./commands/help').execute(interaction);
        }
    }
});

// Přihlášení bota
client.login(DISCORD_TOKEN);

const { EmbedBuilder } = require('discord.js');

async function execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('**Available Commands**')
        .setDescription('Here is a list of all available commands:')
        .addFields(
            { name: '**🤑 /crypto**', value: 'Cryptocurrency information! 💰', inline: true },
            { name: '**🗽 /userinfo**', value: 'User account information. 👤', inline: true },
            { name: '**🌱 /help**', value: 'Shows this list of commands. ℹ️', inline: true },

            // Empty field for separation
            { name: '\u200B', value: '\u200B' },

            { name: '**🛡️ Administrator Commands**', value: ' ' },
            { name: '**🔨 /ban**', value: 'Bans the selected user.', inline: true },
            { name: '**👢 /kick**', value: 'Kicks the selected user from the server.', inline: true }
        )
        .setFooter({ text: 'Sirbo' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}

module.exports = { execute };

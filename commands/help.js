const { EmbedBuilder } = require('discord.js');

async function execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Dostupné Příkazy')
        .setDescription('Tady je seznam všech dostupných příkazů:')
        .addFields(
            { name: '/game', value: 'Hra: Kámen, nůžky, papír! ✊', inline: true },
            { name: '/userinfo', value: 'Zobrazí informace o uživatelském účtu. 👤', inline: true },
            { name: '/help', value: 'Zobrazí tento seznam příkazů. ℹ️', inline: true }
        )
        .setFooter({ text: 'Sirbo' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}

module.exports = { execute };

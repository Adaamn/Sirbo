const { EmbedBuilder } = require('discord.js');

async function execute(interaction) {
    // Pokud je zmíněn uživatel, použije se on, jinak se použije volající uživatel
    const user = interaction.options.getUser('target') || interaction.user;

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('📜 Informace o uživatelském účtu')
        .setDescription(`Zde jsou informace o uživatelském účtu.`)
        .addFields(
            { name: 'Uživatelské jméno', value: user.tag, inline: true },
            { name: 'ID uživatele', value: user.id, inline: true },
            { name: 'Vytvořeno', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        )
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: 'Sirbo' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}

module.exports = { execute };

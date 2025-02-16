const { EmbedBuilder } = require('discord.js');

async function execute(interaction) {
    // If a user is mentioned, use that user, otherwise use the calling user
    const user = interaction.options.getUser('target') || interaction.user;

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('**📜 User Account Information**')
        .setDescription(`Here is the information about the user account.`)
        .addFields(
            { name: '**Username**', value: user.tag, inline: true },
            { name: '**User ID**', value: user.id, inline: true },
            { name: '**Account Created**', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        )
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: 'Sirbo' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}

module.exports = { execute };

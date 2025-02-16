/*const { EmbedBuilder } = require('discord.js');

async function execute(interaction) {
    // Získání uživatele, který použil příkaz
    const user = interaction.user;
    const choices = ['✊', '✋', '✌️']; // Možnosti pro Kámen, nůžky, papír

    // Vytvoření embed zprávy pro interakci
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Hra: Kámen, nůžky, papír!')
        .setDescription('Vyberte jednu z možností: Kámen, Nůžky nebo Papír.')
        .addFields(
            { name: 'Možnosti', value: choices.join(' '), inline: true },
        )
        .setFooter({ text: 'Sirbo' })
        .setTimestamp();

    // Odeslání zprávy s výběrem
    await interaction.reply({
        content: 'Vyberte jednu možnost:',
        embeds: [embed],
        ephemeral: true, // Tato zpráva je viditelná jen pro uživatele, který ji poslal
    });

    // Po nějaké době (nebo po výběru uživatele) odeslat odpověď
    setTimeout(() => {
        interaction.followUp({
            content: `Výběr bota: ${choices[Math.floor(Math.random() * 3)]}`,
        });
    }, 5000); // Po 5 sekundách odpoví bot náhodným výběrem
}

module.exports = { execute };
*/
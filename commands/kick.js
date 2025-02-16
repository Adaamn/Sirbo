const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to kick')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Permission check: Ensure the user executing the command is an Administrator
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setColor(0xff0000) // Red for error
                .setTitle('❌ Insufficient Permissions')
                .setDescription('You do not have permission to use this command!')
                .setTimestamp();
            return interaction.reply({ embeds: [noPermissionEmbed], ephemeral: true });
        }

        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            const notFoundEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ User Not Found')
                .setDescription('This user is not in the server!')
                .setTimestamp();
            return interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
        }
        
        // Additional check for administrators or the server owner
        if (member.permissions.has(PermissionFlagsBits.Administrator) || member.id === interaction.guild.ownerId) {
            const adminEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ Error')
                .setDescription('An administrator or the server owner cannot be kicked.')
                .setTimestamp();
            return interaction.reply({ embeds: [adminEmbed], ephemeral: true });
        }

        try {
            await member.kick('Kicked by an administrator.');

            const successEmbed = new EmbedBuilder()
                .setColor(0x00ff00) // Green for success
                .setTitle('✅ User Kicked')
                .setDescription(`User **${user.tag}** has been successfully kicked from the server.`)
                .setTimestamp();
            return interaction.reply({ embeds: [successEmbed], ephemeral: true }); // Only for the admin
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ Error During Kick')
                .setDescription('There was an error kicking this user.')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};

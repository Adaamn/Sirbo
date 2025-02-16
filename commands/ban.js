const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from this server.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to ban')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Check for permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setColor(0xff0000) // Red color for error
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
                .setDescription('This user is not on the server!')
                .setTimestamp();
            return interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
        }
        
        // Added check for admin or server owner
        if (member.permissions.has(PermissionFlagsBits.Administrator) || member.id === interaction.guild.ownerId) {
            const adminEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ Error')
                .setDescription('An admin cannot be banned.')
                .setTimestamp();
            return interaction.reply({ embeds: [adminEmbed], ephemeral: true });
        }

        try {
            await member.ban({ reason: 'Banned by an admin.' });

            const successEmbed = new EmbedBuilder()
                .setColor(0x00ff00) // Green color for success
                .setTitle('✅ User Banned')
                .setDescription(`User **${user.tag}** has been successfully banned.`)
                .setTimestamp();
            return interaction.reply({ embeds: [successEmbed], ephemeral: true }); // Only for admin
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ Ban Error')
                .setDescription('There was an error banning this user.')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};

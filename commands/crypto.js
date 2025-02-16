const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crypto')
        .setDescription('Fetches the current price of a cryptocurrency.')
        .addStringOption(option =>
            option.setName('coin')
                .setDescription('The name of the cryptocurrency (e.g., bitcoin, ethereum)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const coin = interaction.options.getString('coin').toLowerCase();

        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: coin,
                    vs_currencies: 'usd',
                    include_24hr_change: true
                }
            });

            if (!response.data[coin]) {
                const notFoundEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('❌ Error')
                    .setDescription('Cryptocurrency not found! Try "bitcoin" or "ethereum".')
                    .setTimestamp();

                return interaction.reply({ embeds: [notFoundEmbed] });
            }

            const price = response.data[coin].usd.toLocaleString(); // Formatting price

            // Check if usd_24h_change is not null
            const changeRaw = response.data[coin].usd_24h_change;
            const change24h = changeRaw !== null && changeRaw !== undefined ? changeRaw.toFixed(2) : 'N/A';

            const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle(`💰 Price of ${coin.charAt(0).toUpperCase() + coin.slice(1)}`)
                .setDescription(`Current price: **$${price} USD**`)
                .addFields(
                    { name: '📉 24h Change', value: `${change24h}%`, inline: true },
                    { name: '🌎 Fiat Currency', value: 'USD ($)', inline: true }
                )
                .setFooter({ text: 'Data from CoinGecko' })
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('❌ Error')
                .setDescription('Error fetching data. Please try again later.')
                .setTimestamp();

            return interaction.reply({ embeds: [errorEmbed] });
        }
    },
};

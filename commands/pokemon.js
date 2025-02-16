import fetch from 'node-fetch';  // Použití importu pro node-fetch ve verzi 3.x

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemonInfo(pokemonName) {
    try {
        // Získání dat z API pro daného Pokémona
        const response = await fetch(`${POKE_API_URL}${pokemonName.toLowerCase()}`);
        
        if (!response.ok) {
            throw new Error('Pokémon nenalezen!');
        }

        const data = await response.json();
        return {
            name: data.name,
            type: data.types.map(type => type.type.name).join(', '),
            hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
            attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
            defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function execute(interaction) {
    const pokemonName = interaction.options.getString('name');  // Získání jména Pokémona z příkazu

    if (!pokemonName) {
        return interaction.reply({ content: 'Musíš zadat název Pokémona!', ephemeral: true });
    }

    const pokemonInfo = await getPokemonInfo(pokemonName);

    if (!pokemonInfo) {
        return interaction.reply({ content: 'Pokémon nebyl nalezen, zkuste jiný název!', ephemeral: true });
    }

    const embed = {
        color: 0x0099ff,
        title: `${pokemonInfo.name} - Staty`,
        fields: [
            { name: 'Typ', value: pokemonInfo.type, inline: true },
            { name: 'HP', value: pokemonInfo.hp.toString(), inline: true },
            { name: 'Útok', value: pokemonInfo.attack.toString(), inline: true },
            { name: 'Obrana', value: pokemonInfo.defense.toString(), inline: true },
        ],
        timestamp: new Date(),
        footer: {
            text: 'Informace z PokeAPI',
        },
    };

    await interaction.reply({ embeds: [embed] });
}

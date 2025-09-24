const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() == "menu") {
        if (message.author.id === client.user.id) return;
        
        message.delete();

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select1')
            .setPlaceholder('Sélectionnez votre question dans le menu')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                new StringSelectMenuOptionBuilder()
                    .setLabel('Comment puis-je obtenir un bot perso ?')
                    .setEmoji('1️⃣')
                    .setValue('one')
                    .setDescription('Vous recevrez un tutoriel sur la façon d\'acheter un bot perso.'),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel('Pourquoi OneForAll ne répond pas à !help ?')
                    .setEmoji('2️⃣')
                    .setValue('two')
                    .setDescription('Vous recevrez une explication des raisons pour lesquelles le bot ne répond pas a !help.'),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel('Mon token est-il sécurisé ?')
                    .setEmoji('3️⃣')
                    .setValue('three')
                    .setDescription('Vous recevrez une réponse, que votre token soit sécurisé ou non.'),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel('Comment puis-je inviter le bot OneForAll ?')
                    .setEmoji('4️⃣')
                    .setValue('four')
                    .setDescription('Vous recevrez un tutoriel sur la façon d\'inviter le OneForAll.'),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel('Pourquoi le bot est dans les commandes slash ?')
                    .setEmoji('5️⃣')
                    .setValue('five')
                    .setDescription('Vous recevrez une explication de la raison pour laquelle le bot est dans les commandes slash.'),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel('Mon problème n\'est pas dans la liste')
                    .setEmoji('6️⃣')
                    .setValue('six')
                    .setDescription('On vous dira quoi faire si votre problème ne figure pas sur cette liste.')
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle('OneForAll - Auto Support.')
            .setThumbnail('https://media.discordapp.net/attachments/891007917669625906/915679967197671504/OneForAll.png?width=580&height=580')
            .setDescription('**Sélectionnez votre question dans le menu ci-dessous**.\n\n1️⃣ Comment puis-je obtenir un bot perso ?\n2️⃣ Pourquoi OneForAll ne répond pas à !help ?\n3️⃣ Mon token est-il sécurisé ?\n4️⃣ Comment puis-je inviter le bot OneForAll ?\n5️⃣ Pourquoi le bot est dans les commandes slash ?\n6️⃣ Mon problème n\'est pas dans la liste')
            .setColor('#2F3136');

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    
    if (interaction.customId === 'select1') {
        const member = interaction.member;
        let response = '';

        switch (interaction.values[0]) {
            case 'one':
                response = `Bonjour <@${member.id}>, si vous souhaitez acheter un bot perso, vous pouvez vérifier <#784399775982157857> (https://discord.com/channels/780528735183044709/784399775982157857/916411391106232340)`;
                break;
            
            case 'two':
                response = `Bonjour <@${member.id}>, Nous avons déplacer tout le bot en slash (\`5\` pour plus d'information) donc le prefix est maintenant \`/\` .`;
                break;
            
            case 'three':
                response = `Bonjour <@${member.id}>, contrairement à **OneForAll V1.0** nous avons renforcé nos sécurité nous encryptons difficilement tout vos token de bot pour éviter tout risque.
                break;
                
            case 'four':
                response = `Bonjour <@${member.id}>, pour inviter le bot il suffit de cliquer sur ce lien : \nhttps://discord.com/api/oauth2/authorize?client_id=912445710690025563&permissions=8&scope=bot%20applications.commands`;
                break;
            
            case 'five':
                response = `Bonjour <@${member.id}>, nous allons devoir demander un accès a discord pour pouvoir avoir accès au contenue des messages c'est donc pourquoi nous avons supprimé les commandes normale.`;
                break;
            
            case 'six':
                response = `Bonjour <@${member.id}>, si votre question ne figure pas dans cette liste, mentionnez un staff dans le chat ou créer un ticket (<#784107730368593940>).`;
                break;
        }

        await interaction.reply({ content: response, ephemeral: true });
    }
});

client.on('clientReady', () => {
    console.log("Bot ready");
});

client.login('token');

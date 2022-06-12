const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "man",
    description: 'Rastegele Man Gif/PP atar',
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        axios.get("https://api.roxza.me/v1/random?type=man")
            .then(res => {
                const embed = new MessageEmbed()
                    .setImage(res.data.url)
                    .setFooter({ text: `${interaction.member.user.tag} tarafından isntendi` })
                interaction.reply({ embeds: [embed] });
            })
            .catch(() => {
                interaction.reply({ content: "Bir hata oluştu!", ephemeral: true });
            })
    }
};

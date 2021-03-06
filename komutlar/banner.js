const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "banner",
  description: 'Belirtilen kullanıcının bannerını alır',
  options: [
    {
      name: "kullanıcı",
      description: "Bannerını almak istediğiniz kullanıcnıyı belirtin",
      type: 6
    }
  ],
  /**
   * 
   * @param {Clinet} client 
   * @param {CommandInteraction} interaction 
   */
  run: async (client, interaction) => {
    const target = interaction.options.getMember("kullanıcı") || interaction.member;

    axios.get(`https://discord.com/api/users/${target.id}`, {
      headers: {
        Authorization: "Bot " + client.token,
      }
    }).then(res => {
      if (res.data.banner) {
        if (res.data.banner.startsWith("a_")) {
          interaction.reply({
            embeds: [new MessageEmbed().setTitle(target.user.tag)
              .setDescription(`[Web Site](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.gif?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.gif?size=4096`)]
          })
        }
        else {
          interaction.reply({
            embeds: [new MessageEmbed().setTitle(target.user.tag).setDescription(`[Web Site](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.png?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.png?size=4096`)]
          })
        }
      } else {
        interaction.reply({embeds:[new MessageEmbed().setDescription("Kullanıcıda banner bulunmuyor")]})
      }
    })
  }
}

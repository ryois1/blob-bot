module.exports = {
  name: "github",
  description: "github",
  async execute(message, args) {
    const { Octokit } = require("@octokit/rest");
    const octokitRepo = new Octokit();
    const octokitUser = new Octokit();
    const Discord = require("discord.js");
    var repo;
    async function getRepo(args){
      await octokitRepo.request("GET /search/repositories", {
        q: `${args}`,
        per_page: `1`,
    }).then(({data}) => {
      if (data.items[0] == undefined){
          message.reply(`I could not find a repository with that name.`);
          return false;
      }else{
        repo = {name: data.items[0].full_name, url: data.items[0].html_url, description: data.items[0].description, language: data.items[0].language, forks: data.items[0].forks_count, watchers: data.items[0].watchers_count, owner: {avatar: data.items[0].owner.avatar_url, name: data.items[0].owner.login}};
        return true;
      }
    });
    }
    async function getUser(repo){
      await octokitUser.request("GET /search/users", {
        q: `${repo.owner.name}`,
        per_page: `1`,
      }).then(({ data }) => {
        repo.owner.url = data.items[0].html_url;
      });
    }
    async function sendResult(repo, message){
      const GithubEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(repo.name)
      .setURL(repo.url)
      .setAuthor(repo.owner.name, repo.owner.avatar, repo.owner.url)
      .addFields(
        { name: "Description", value: `${repo.description}` },
        { name: "Primary Language", value: `${repo.language}`, inline: true },
        { name: "Watchers", value: `${repo.watchers}`, inline: true },
        { name: "Forks", value: `${repo.forks}`, inline: true }
      )
      .setTimestamp()
      .setFooter(
        `${repo.name} on GitHub`,
        "https://blob.rocks/GitHub-Mark-Light-64px.png"
      );
      message.channel.send(GithubEmbed);
    }
    if(getRepo(args)){
      getUser(repo);
      sendResult(repo, message);
    }
  },
};

// ============================================================================================================
// This is Hound4004's Discord bot called Houndbot4004 for his Discorder Server "Houndcord4004" 
// This bot's index was last updated (3/24/2026)
// ============================================================================================================


// ============================================================================================================
// GLOBAL ERROR HANDLING Updated (3/24/2026)
// ============================================================================================================

// Catch sync errors (crashes)
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:');
  console.error(err);
});

// Catch async errors (promises)
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

// ============================================================================================================

const { Client, Intents, MessageButton, MessageActionRow, ButtonBuilder, ButtonStyle, MessageEmbed, EmbedBuilder, Partials, Events, Collection, WebhookClient, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const Discord = require('discord.js'); //if future error... remove this badboy!

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    //    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    //    GatewayIntentBits.GuildMembers

  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
});

const userWarnings = {};

client.events = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
//client.prefix = config.prefix


const fs = require("fs");
client.db = require("quick.db");
client.request = new (require("rss-parser"))();

require('events').EventEmitter.defaultMaxListeners = 20;


// ============================================================================================================
// Discord (client) ERROR HANDLING Updated (3/24/2026)
// ============================================================================================================
// Discord client errors
client.on('error', (err) => {
  console.error('🤖 Discord Client Error:', err);
});

// Discord warnings (rate limits, etc.)
client.on('warn', (info) => {
  console.warn('⚠️ Discord Warning:', info);
});

// Optional: log when bot disconnects/reconnects
client.on('shardDisconnect', (event, shardId) => {
  console.warn(`⚠️ Shard ${shardId} disconnected`, event);
});

client.on('shardReconnecting', (shardId) => {
  console.log(`🔄 Shard ${shardId} reconnecting...`);
});

// ===============================================================================


// ============================================================================================================
//files data: Last updated (?/?/????)
// ============================================================================================================

const keepAlive = require("./server");
require('./server.js');

client.config = require("./config.js");//for video notifier
client.bdays = require("./saved_bday_data.js")

var http = require('http');
var server = http.createServer(function(req, res) {
  res.end('test');
});
server.on('listening', function() {
  console.log('ok, server is running');
});
server.listen(80);//was 80



client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
  start_up();
});
const ROLE_IDS = [
  '1107297102788300911',
  '1107296662621257800',
  '1107296255794745354',
  '1112062613640200292',
  '1107294677171974207',
  '1107293670991999026',
  '1107292972262903888',
  '1107291772784222330'
];

client.on('messageCreate', async (message) => {
  console.log("message");
  if (message.content === '!assign_roles') {
    console.log("assigning roles");
    try {
      const guild = client.guilds.cache.get('599652841132392476');
      const members = await guild.members.fetch();
      members.forEach(async (member) => {
        for (const roleID of ROLE_IDS) {
          const role = guild.roles.cache.get(roleID);
          await member.roles.add(role);
        }
      });
      message.channel.send('Roles assigned to all members!');
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while assigning roles.');
    }
  }
});

//put all functions inside of this? no need to run if bot isn't on!
var Check_Functions = 0;
function start_up() {
  //day_data(); //good example https://replit.com/talk/ask/bot-turns-off/86551

  Swear_detect();
  console.log(Check_Functions);
  //commands_call();
  reactionroles();
  handleUploads();
  setInterval(handleUploads, 60000);

  if (Check_Functions == 3) {
    console.log(Check_Functions + ": All Functions running correctly");
  }  //else {clearInterval(date_check_time_interval);}
}


//========================================================================
//welcome bot
//========================================================================
client.on('guildMemberAdd', member => {
  const welcome_channel = client.channels.cache.get('700732150529392741');
  welcome_channel.send(`<@${member.id}> Welcome to the server! Before you start, please check <#${695022777081528363}>`);
  let Role_Testrole = member.guild.roles.cache.find(r => r.name === "DISCORD_ROLES_REACT_ROBOT_EMOJI_ID");
  member.roles.add(Role_Testrole).catch(console.error);
  console.log("welcome_2 worked");
});
//========================================================================
// end welcome bot
//========================================================================

//========================================================================
// Slash Command Builder Last Updated (?/?/????)
//========================================================================

//https://replit.com/@anonimusas/DiscordJS-V14-Bot-Template#index.js

//const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Replies with your input!')
  .addStringOption(option =>
    option.setName('input')
      .setDescription('The input to echo back'));
/*.addChannelOption(option =>
  option.setName('channel')
    .setDescription('The channel to echo into'));
*/

// Create a slash command builder
const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Check if this interaction is responsive');
// Get the raw data that can be sent to Discord
const rawData = pingCommand.toJSON();

//========================================================================
//========================================================================



//========================================================================
// User input (messgae) detection Last update (3/24/2026)  
// Need to only have one client.on('messageCreate'.... fix this soon!
//========================================================================
//works, fires multiple times!
const triggerWords = ['banana', 'fire', 'white'];

client.on('messageCreate', (message) => {
  const message_content = message.content.toLowerCase(); //Lets simplify the message to the letters

  triggerWords.forEach((word) => {
    if (message_content.includes(word) && message.author.id != 946745700966891550) {
      message.reply(message_content);
    }})
  
  if (message_content == "hi") {
    message.reply({ content: 'hello', allowedMentions: { repliedUser: false } });
  }
  
  Swear_detect(message_content, message); //This calls to the swear detect function below. passes the message to said fuction
});

//Swear Bot
function Swear_detect(message_content,message) {
  const { bad_words } = require('./Swear_Bot_vocab.js');
    bad_words.forEach(bad_word => {
        if (message_content.includes(bad_word)) {
            message.reply("No swearing please! 😊");
            message.react('❌');
        }
    });
}

  
  /*
  client.on("messageCreate", async (msg) => {
    let mutedRole = msg.guild.roles.cache.find((role) => role.name === 'Muted');
    if (!mutedRole) {
      try {
        mutedRole = await msg.guild.roles.create({
          name: 'Muted',
          permissions: [],
          reason: 'Muted role creation'
        });
        msg.guild.channels.cache.forEach((channel) => {
          channel.permissionOverwrites.create({
            role: mutedRole,
            permissions: [
              {
                id: mutedRole.id,
                deny: ['SEND_MESSAGES']
              }
            ]
          }).catch(error => {
            console.error('Failed to set channel permissions:', error);
          });
        });
        console.log('Muted role created successfully.');
      } catch (error) {
        console.error('Failed to create muted role:', error);
      }
    }
    if (bad_words.some((word) => msg.content.toLowerCase().includes(" " + word + " "))) {
      if (userWarnings[msg.author.username] == 4) {
        msg.reply({ content: 'No swearing. FINAL WARNING!', allowedMentions: { repliedUser: true } });
      } else {
        if (userWarnings[msg.author.username] > 4 && userWarnings[msg.author.username] < 7) {
          msg.reply({ content: 'No swearing. You will be muted for an hour.', allowedMentions: { repliedUser: true } });
        } else {
          if (userWarnings[msg.author.username] == 15) {
            msg.reply({ content: msg.author.username + 'was kicked for excessive swearing', allowedMentions: { repliedUser: true } });
          } else {
            if (userWarnings[msg.author.username] > 6) {
              msg.reply({ content: 'No swearing. You will be muted for a day', allowedMentions: { repliedUser: true } });
            }
            msg.reply({ content: 'No swearing. This is a warning!', allowedMentions: { repliedUser: true } });
          }
        }
      }
      msg.react('❌');
      if (!userWarnings[msg.author.username]) {
        userWarnings[msg.author.username] = 0;
      }
      userWarnings[msg.author.username]++;
      if (userWarnings[msg.author.username] > 4) {
        if (mutedRole) {
          console.log(msg.author);
          try {
            const member = await msg.guild.members.fetch(msg.author.id);
            member.roles.add(mutedRole);
            if (userWarnings[msg.author.username] > 4 && userWarnings[msg.author.username] < 7) {
              setTimeout(RemoveRole, 3600000, member, mutedRole);
            } else {
              if (userWarnings[msg.author.username] > 14) {
                await msg.author.kick();
              } else {
                setTimeout(RemoveRole, 86400000, member, mutedRole);
              }
            }
            console.log('User muted successfully.');
          } catch (error) {
            console.error('Failed to mute user:', error);
          }
        }
      }
    }
  });
  Check_Functions = Check_Functions + 1;
}//Swear Bot End
*/

function RemoveRole(member, role) {
  member.roles.remove(role);
}


//========================================================================
//========================================================================
//reaction working
function reactionroles() {
  const reactions = [
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🔔", function: AllNotifications },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📢", function: Announcements },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📊", function: Polls },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🤖", function: BotUpdates },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎬", function: AllContent },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎥", function: Videos },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🩳", function: Shorts },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🔴", function: Live },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎙️", function: Podcast },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📰", function: MinecraftNews },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "❌", function: Mee6Hate },
    { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "✅", function: Mee6Love }
  ];

  client.on("messageReactionAdd", async (reaction, user) => {
    const reactedMessageId = reaction.message.id;
    const matchedReaction = reactions.find(
      (react) => react.messageId === reactedMessageId && react.emoji === reaction.emoji.name
    );

    if (matchedReaction && matchedReaction.function) {
      matchedReaction.function(user);
      reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.id)
        .catch(console.error);
    }
  });

  function AllNotifications(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    const requiredRoles = [
      "1107291772784222330",
      "1107292972262903888",
      "1107293670991999026",
      "1107294677171974207",
      "1112062613640200292",
      "1107296255794745354",
      "1107296662621257800",
      "1107297102788300911"
    ];

    const hasAllRoles = requiredRoles.every(roleId => member.roles.cache.has(roleId));

    if (hasAllRoles) {
      requiredRoles.forEach(roleId => member.roles.remove(roleId));
    } else {
      requiredRoles.forEach(roleId => member.roles.add(roleId));
    }
  }

  function Announcements(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107291772784222330")) {
      member.roles.remove("1107291772784222330");
    } else {
      member.roles.add("1107291772784222330");
    }
  }

  function Polls(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107292972262903888")) {
      member.roles.remove("1107292972262903888");
    } else {
      member.roles.add("1107292972262903888");
    }
  }

  function BotUpdates(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107293670991999026")) {
      member.roles.remove("1107293670991999026");
    } else {
      member.roles.add("1107293670991999026");
    }
  }

  function AllContent(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    const requiredRoles = [
      "1107294677171974207",
      "1112062613640200292",
      "1107296255794745354"
    ];

    const hasAllRoles = requiredRoles.every(roleId => member.roles.cache.has(roleId));

    if (hasAllRoles) {
      requiredRoles.forEach(roleId => member.roles.remove(roleId));
    } else {
      requiredRoles.forEach(roleId => member.roles.add(roleId));
    }
  }

  function Videos(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107294354726469672")) {
      member.roles.remove("1107294354726469672");
    } else {
      member.roles.add("1107294354726469672");
    }
  }

  function Shorts(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1112062613640200292")) {
      member.roles.remove("1112062613640200292");
    } else {
      member.roles.add("1112062613640200292");
    }
  }

  function Live(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107296255794745354")) {
      member.roles.remove("1107296255794745354");
    } else {
      member.roles.add("1107296255794745354");
    }
  }

  function Podcast(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107296662621257800")) {
      member.roles.remove("1107296662621257800");
    } else {
      member.roles.add("1107296662621257800");
    }
  }

  function MinecraftNews(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("1107297102788300911")) {
      member.roles.remove("1107297102788300911");
    } else {
      member.roles.add("1107297102788300911");
    }
  }

  function Mee6Love(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("713050162574000209")) {
      member.roles.remove("713050162574000209");
    } else {
      member.roles.add("713050162574000209");
    }
  }

  function Mee6Hate(user) {
    const guild = client.guilds.cache.get("599652841132392476");
    const member = guild.members.cache.get(user.id);

    if (member.roles.cache.has("713050273458946110")) {
      member.roles.remove("713050273458946110");
    } else {
      member.roles.add("713050273458946110");
    }
  }
}


//========================================================================
//========================================================================

//function day_data() {}

//========================================================================
//========================================================================

//start detect video
function handleUploads() {
  if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
  //   setInterval(() => { //non needed interval
  //new section
  console.log("Video_checked");

  const Gather_json_file_data = async () => {
    const data_gathered = fs.readFileSync('./json.sqlite');
    return data_gathered;
  };

  client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
    .then(data => {
      if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
      else {
        //delete json.sqlite here?
        client.db.set(`videoData`, data.items[0]);
        client.db.push("postedVideos", data.items[0].link);
        let parsed = client.db.fetch(`videoData`);
        let channel = client.channels.cache.get(client.config.Discord_Video_channel);
        if (!channel) return;

        /*flaged
        ===============================================
        ===============================================
        */
        //below should only delete the old, if a new video is posted!
        //delete word_test
        delete_word_json();
        function delete_word_json() {

          Gather_json_file_data().then(data_gathered => {
            console.log("gathered video data 1");
            if (data_gathered.includes("News")) {

              var delete_data = "\b";
              fs.appendFile('json.sqlite', delete_data,
                // callback function
                function(err) {
                  if (err) throw err;
                  // if no error
                  console.log("deleted data in json.sqlite sucsesfully");
                }
              );
            }
            if (data_gathered.includes("Shorts")) {

              var delete_data = "\b";
              fs.appendFile('json.sqlite', delete_data,
                // callback function
                function(err) {
                  if (err) throw err;
                  // if no error
                  console.log("deleted data in json.sqlite sucsesfully");
                }
              );
            }
          }).catch(err => {
            console.log('some error occured in using/gathering data');
            return data_gathered;
          });
        }
        //End_delete word_test


        var title_check = /{title}/g;
        if (title_check == "chicken") { console.log("Cluck"); } else {

          //other thing above goes here
          console.log("test");

          Gather_json_file_data().then(data_gathered => {
            console.log(data_gathered);
            if (data_gathered.includes("News")) {
              //dosent like .toLowerCase()

              /*end flaged
              ===============================================
              ===============================================
              */
              console.log("News Video type");
              let message_video = client.config.messageTemplateMCN
                .replace(/{author}/g, parsed.author)
                .replace(/{title}/g, parsed.title)
                //Discord.Util.escapeMarkdown(parsed.title))
                .replace(/{url}/g, parsed.link);
              channel.send(message_video);
            } else if (data_gathered.includes("News")) {
              //dosent like .toLowerCase()

              /*end flaged
              ===============================================
              ===============================================
              */
              console.log("Short Video");
              let message_video = client.config.messageTemplateSHT
                .replace(/{author}/g, parsed.author)
                .replace(/{title}/g, parsed.title)
                //Discord.Util.escapeMarkdown(parsed.title))
                .replace(/{url}/g, parsed.link);
              channel.send(message_video);
            } else {
              console.log("Defalt video type ");
              let message_video = client.config.messageTemplate
                .replace(/{author}/g, parsed.author)
                .replace(/{title}/g, parsed.title)
                // Discord.Util.escapeMarkdown(parsed.title))
                .replace(/{url}/g, parsed.link);
              channel.send(message_video);
            }

            console.log("Video Posted!!?!?");
          });//.catch(err => {
          // console.log('some error occured in using/gathering data');
          // return data_gathered;
          //   }) //end Data_gathered //end of requirefile
        }//end chicken ELSE
        console.log("maybe_2");

      }
    });
  //}); //non needed interval end
  Check_Functions = Check_Functions + 1;
}
//end detect video

//========================================================================
//========================================================================
//birthdays
var dayDone = false;
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
setInterval(checkDate, 1800000, day);
var birthdays = [];
for (var key in client.bdays) {
  if (client.bdays.hasOwnProperty(key)) {
    birthdays.push(client.bdays[key]);
  }
}
if (!dayDone) {
  for (var i = 0; i < birthdays.length; i++) {
    var birthday = birthdays[i].substring(birthdays[i].indexOf("sb|") + 3, birthdays[i].indexOf("|eb"));
    var userID = birthdays[i].substring(birthdays[i].indexOf("si|") + 3, birthdays[i].indexOf("|ei"));

    if (birthday.substring(0, 2) == day && birthday.substring(2, 4) == month) {
      const userMention = `<@${userID}>`;
      const age = year - parseInt(birthday.substring(4, 8));
      client.on('ready', () => {
        client.channels.cache.get('707687634381570142').send(`It's ${userMention}'s ${age}th Birthday Today!! :tada::tada::birthday::tada::tada:`);
      });
    }
  }
  dayDone = true;
}

function checkDate(oldDay) {
  console.log("checking if the date has changed");
  var date = new Date();
  var day = date.getDate();
  if (day != oldDay && !dayDone) {
    dayDone = false;
    console.log("date has changed");
    currentDate = date;
    for (var i = 0; i < birthdays.length; i++) {
      var birthday = birthdays[i].substring(birthdays[i].indexOf("sb|") + 3, birthdays[i].indexOf("|eb"));
      var userID = birthdays[i].substring(birthdays[i].indexOf("si|") + 3, birthdays[i].indexOf("|ei"));

      if (birthday.substring(0, 2) == day && birthday.substring(2, 4) == month) {
        const userMention = `<@${userID}>`;
        const age = year - parseInt(birthday.substring(4, 8));
        client.on('ready', () => {
          client.channels.cache.get('707687634381570142').send(`It's ${userMention}'s ${age}th Birthday Today!! :tada::tada::birthday::tada::tada:`);
        });
      }
    }
    dayDone = true;
  } else {
    console.log("date has not changed");
  }
}

//========================================================================
//========================================================================


//need
Bot_Alive();
function Bot_Alive() {
  login_do();
  keepAlive();
} //this is the // at the bottem

function login_do() {
  client.login(process.env.TOKEN)
    .catch((err) => {
      console.warn("[CRASH] Something went wrong when connecting to Houndbot... \n");
      console.warn("[CRASH] Error from Discord API:" + err);
      process.exit();
    });
  console.log("still connected!");
}
module.exports = login_do;

//========================================================================
//========================================================================
//commands

var commands = [];
commands.push(
  /*["Command", Function]*/
  ["!ChannelPost", UploadSim],
  ["!Random Number", Random],
  ["!NewBirthday", AddBirthday],
  ["!NewPoll", CreatePoll]
)

//command handler
client.on('messageCreate', (message) => {
  var parameters = [];
  var parameterAMT = (message.content.match(/, /g) || []).length;
  let startIndex = 0;
  for (let j = 0; j < parameterAMT; j++) {
    let startIdx = message.content.indexOf(", ", startIndex);
    let endIdx = message.content.indexOf(", ", startIdx + ", ".length);
    if (endIdx === -1) {
      var parameter = message.content.substring(startIdx + ", ".length);
    } else {
      var parameter = message.content.substring(startIdx + ", ".length, endIdx);
    }
    parameters.push(parameter);
    startIndex = startIdx + ", ".length;
  }
  for (let i = 0; i < commands.length; i++) {
    if (message.content.substring(0, commands[i][0].length) == commands[i][0]) {
      commands[i][1](message, parameters);
    }
  }
});

async function CreatePoll(message, options) {
  var Poll;
  var OptionButtons = [];
  console.log(options[0]);
  const PollEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(options[0])
    .setTimestamp();
  for (let i = 1; i < options.length; i++) {
    PollEmbed.addFields(
      { name: `Option ${i}`, value: options[i], inline: true}
    );
    const Option = new ButtonBuilder()
      .setStyle(1)
      .setLabel(`Option ${i}`)
      .setCustomId(`Option-${i}`);
    OptionButtons.push(Option);
  }
  const rows = [];
  for (let i = 0; i < OptionButtons.length; i += 5) {
    const rowButtons = OptionButtons.slice(i, i + 5);
    rows.push({ type: 1, components: rowButtons });
  }
  Poll = await message.channel.send({ embeds: [PollEmbed], components: rows });
}


//channel upload
function UploadSim(message, parameters) {
  let message_video = client.config.messageTemplate;
  let parsed = client.db.fetch(`videoData`);
  if (parameters.length > 0) {
    message_video = message_video.replace(/{author}/g, "**" + parameters[0] + "**");
    if (parameters.length > 1) {
      message_video = message_video.replace(/{title}/g, "**" + parameters[1] + "**");
      if (parameters.length > 2) {
        message_video = message_video.replace(/{url}/g, "**" + parameters[2] + "**");
      } else {
        message_video = message_video.replace(/{url}/g, parsed.link);
      }
    } else {
      message_video = message_video.replace(/{title}/g, parsed.title);
      message_video = message_video.replace(/{url}/g, parsed.link);
    }
  } else {
    message_video = message_video.replace(/{author}/g, parsed.author);
    message_video = message_video.replace(/{title}/g, parsed.title);
    message_video = message_video.replace(/{url}/g, parsed.link);
  }
  if (permCheck(message.author.username, "Moderator", message.guild.name)) {
    message.channel.send(message_video);
  }
}

//generate a random number
function Random(message, parameters) {
  let min = parameters[0];
  let max = parameters[1];
  if (min == undefined) {
    min = 1;
  }
  if (max == undefined) {
    max = 10;
  }
  message.channel.send("Your number between " + min + " and " + max + " is " + Math.floor(Math.random() * (max - min + 1) + min).toString());
}

function AddBirthday(message, parameters) {
  var day = parameters[0];
  var month = parameters[1];
  var year = parameters[2];
  var userid = parameters[3];
  if (userid) {
    userid = userid.substring(userid.indexOf("<@") + 2, userid.indexOf(">"));
  }
  if (!day) {
    date = new Date();
    day = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
  } else if (!month) {
    date = new Date();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
  } else if (!year) {
    date = new Date();
    year = currentDate.getFullYear();
  }
  if (!userid) {
    userid = message.author.id;
    console.log("improvUser");
  }
  if (month.toString().length == 1) {
    month = "0" + month.toString();
  } else {
    day = day.toString();
    month = month.toString();
    year = year.toString();
  }
  var string = "si|" + userid.toString() + "|ei sb|" + day + month + year + "|eb";
  console.log(string);
  const fs = require('fs');
  client.users.fetch(userid)
    .then(user => {
      const username = user.username;
      console.log(username);

      const filePath = 'saved_bday_data.js';
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const modifiedContent = data.replace("}", username + ': "' + string + '",\n }');
        fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    })
    .catch(console.error);
}


//========================================================================
//========================================================================
//simplified functions

//check for proper permissions
function permCheck(userName, roleName, serverName) {
  const guilds = client.guilds.cache;
  let currentGuild = null;
  guilds.forEach((guild) => {
    if (guild.name === serverName) {
      currentGuild = guild;
    }
  });
  let user = null;
  currentGuild.members.cache.forEach((member) => {
    if (member.user.username === userName) {
      user = member.user;
      return;
    }
  });
  if (user) {
    const userRoles = currentGuild.members.cache.get(user.id).roles.cache;
    if (userRoles.some((role) => role.name === roleName)) {
      return true;
    }
  }
  return false;
}

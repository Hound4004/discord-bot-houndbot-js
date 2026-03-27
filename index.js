// ============================================================================================================
// This is Hound4004's Discord bot called Houndbot4004 for his Discorder Server "Houndcord4004" 
// This bot's index was last updated (3/26/2026)
// ============================================================================================================
.
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

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,

  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
});

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
//files data: and logged in Last updated (3/25/2026)
// ============================================================================================================

const keepAlive = require('./server.js');
client.config = require("./config.js");//for video notifier

client.once(Events.ClientReady, c => {
  console.log(`✅ Logged in as ${c.user.tag}`);
  console.log("Starting start_up()...");
  start_up();
  console.log("start_up() completed!");
});


//========================================================================
//start_up() function| run all functions | last Updated (3/26/2026)
//========================================================================
function start_up() {
  // (functions like swear _detect are called on the user input later in the code! 
  
  console.log("📍 start_up: Starting reactionroles...");
  reactionroles();
  
  console.log("📍 start_up: Starting handleUploads...");
  handleUploads();
  
  console.log("📍 start_up: Setting interval for handleUploads...");
  setInterval(handleUploads, 100000);
  
  console.log("📍 start_up: Setting Random Holiday function...");
  Random_Holiday_of_the_Day();
  
  console.log("✅ start_up: All functions started!");
}

//========================================================================
// welcome bot
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

//========================================================================
//Swear Bot function last updated (3/26/2026)
//========================================================================
const recentSwears = {};

function Swear_detect(message_content,message) {
  const { bad_words } = require('./Swear_Bot_vocab.js');
  const userId = message.author.id;
  let message_contains_bad_word = false

  for (const bad_word of bad_words) {
    const bad_word_pattern = new RegExp(`\\b${bad_word}\\b`, 'i');     // \b matches word boundaries (spaces, punctuation, start/end)
    if (bad_word_pattern.test(message_content)) {
      message_contains_bad_word = true;
      break;
    }
  }

  if(message_contains_bad_word==true){
    const now = Date.now();   // Get current time
   // Clean up old swears (keep only last 5 minutes)
    if (!recentSwears[userId]) {
      recentSwears[userId] = [];
    }
    recentSwears[userId] = recentSwears[userId].filter(time => now - time < 300000); // 5 minutes
        recentSwears[userId].push(now);
    
    // Count swears in last 5 minutes
    const swearCount = recentSwears[userId].length;
    
    message.react('❌').catch(console.error);
    let swear_warning_Message_reply = "";

    
    if (swearCount == 1) {
      swear_warning_Message_reply = "No swearing please! 😊";
    }
    else if (swearCount == 2) {
      swear_warning_Message_reply = "I already told you! No swearing! ⚠️";
    }
    else if (swearCount >= 3) {
      swear_warning_Message_reply = "FINAL WARNING! Stop swearing or you'll be muted! 🚫";
    }
    message.channel.send(`<@${message.author.id}>, ${swear_warning_Message_reply}`).catch(console.error);
    message.delete().catch(console.error);
  }
}
//========================================================================
//end swear bot
//========================================================================

  



//========================================================================
//react to gain/remove roles last updated (?/?/????)
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
// Random Holiday of the Day - last updated (3/26/2026)
//========================================================================
function Random_Holiday_of_the_Day() {
  const holidayChannel = client.channels.cache.get(process.env.DISCORD_HOLLIDAY_CHAT_ID);  
  try {
    // Read the holidays file
    const data = fs.readFileSync('./random_holidays.txt', 'utf8');
    const lines = data.split('\n');
    
    // Get today's date in MM/DD format
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayCode = `${month}/${day}`;
    
    // Find today's holiday
    let holidayMessage = "";
    for (const line of lines) {
      if (line.startsWith(todayCode)) {
        holidayMessage = line.substring(6); // Remove the "01/01 " part
        break;
      }
    }
    
    // Send to Discord
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    holidayChannel.send(`📅 **${formattedDate}**\n🎉 Today's Random Holiday: **${holidayMessage}**`);
    console.log(`📅 Sent holiday: ${holidayMessage}`);
    
  } catch (error) {
    console.error('❌ Failed to send holiday:', error.message);
  }
}
//========================================================================
// END Random Holiday
//========================================================================

//========================================================================
//Get Latest Hound4004 YouTube Video / detect video
//========================================================================
function handleUploads() {
  if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
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
          console.log("test");
          
          Gather_json_file_data().then(data_gathered => {
            console.log(data_gathered);
            if (data_gathered.includes("News")) {
              console.log("News Video type");
              let message_video = client.config.messageTemplateMCN
                .replace(/{author}/g, parsed.author)
                .replace(/{title}/g, parsed.title)
                //Discord.Util.escapeMarkdown(parsed.title))
                .replace(/{url}/g, parsed.link);
              channel.send(message_video);
            } else if (data_gathered.includes("Shorts")) {
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
          });
        }//end chicken ELSE
        console.log("maybe_2");

      }
    });
  //}); //non needed interval end
}
//end detect video

//========================================================================
// Keep bot alive! | Last updated (3/26/2026)
//========================================================================
Bot_Alive();
function Bot_Alive() {
  login_do();
  keepAlive(); // keepAlive() on server.js
} 

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

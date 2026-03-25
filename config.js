// ============================================================================================================
// This is Hound4004's Discord bot called Houndbot4004 for his Discorder Server "Houndcord4004" 
// This bot's config.js was last updated (3/24/2026)
// This is for mesage templates, and other changeable things used in the main index
// ============================================================================================================

module.exports = {
    Discord_Video_channel: process.env.DISCORD_Video_ID, 
    messageTemplateMCN: "**<@&1107297102788300911>** **<@&1107294677171974207>**  **{author}** just Posted a News Video: **{title}**! **{url}** go check it out!👍",
    messageTemplate: "**<@&1107294677171974207>**, **{author}** just uploaded a video **{title}**! **{url}** go check it out!👍",
    messageTemplateSHT: "**<@&1112062613640200292>**, **{author}** just uploaded a short **{title}**! **{url}** go check it out!👍",
    channel_id: process.env.CHANNEL_Video_ID,
    watchInterval: 80000
}

// ============================================================================================================
//the following code to be un-commented when the bot is being worked on to prevent un-nesisary pinging
// ============================================================================================================

/*var Wip_Msg = " I am being tested right now, this is only here because my brains are being torn apart! This is a much better message than getting pinged!"
module.exports = {
    Discord_Video_channel: process.env.DISCORD_Video_ID, 
    messageTemplateMCN: Wip_Msg,
    messageTemplate: Wip_Msg,
    messageTemplateSHT: Wip_Msg,
    channel_id: process.env.CHANNEL_Video_ID,
    watchInterval: 80000
}*/

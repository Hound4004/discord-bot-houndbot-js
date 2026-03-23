
/* 
👉changelog: 
This new version of Houndbot is the roles update


👉 Fixes, changes, and errors:
-touched: Index, config, env for roles


👉 New and fun stuff:
💥You can now automaticly get roles via Houndbot in #roles
💥This mean there is a new function and to check if all functions are all working, the intager we are looking for is now 3!

💥 the video watchtime intervull for checking if there is a new video on my channel is now set to 40000 instead of 30000!
💥 updated roles ping for when a video is uploaded!



⏩💥all old commands are now built off the slash command builder

💥⏩new system for special videos, example: if your only here for news, my bot will detect the video is a news, a new special role will be pinged jut for that video type, and not others!!
💥MCN_template now detects 'News' 

💥⏩ a new command to imput birthday. on said imput day, bot will say happy birthday
💥the above creates a new.json (saved_bday_data.json) apon called for new birthday imput. if there is an error, tell me, i can access and change this file manualy
⏩add time function to check day, if its users birthday, say happy birthday
⏩Like mee 6 did, you can now add your birthday date and it will store it in a json.sqlite
⏩ Working Welcome function
🟥⏩Check if user is a bot... if so, they go bye bye🟥
⏩added emoji reactor function. this will soon take place as a server update, not a bot update! (but at least it exists)
⏩if you think its taking too long for a video to show up, a command will allow you to access the function 


⏩add randomizer for funny message... like pie guy.. below is start...

var min = 10;
var max = 20;
console.log((Math.random()*(max-min)+min));

if (Math.random() < 0.5) {
  console.log("heads!");
} else {
  console.log("tails!");
}


👉 Known Issues: 
❌ Occasionally, he does turn off, however he will turn back on by himself within no time! no data or function is lost
❌a culprit of the thing above, sometimes cant connect to discord or YouTube resulting in exit code(1) or 'ECONNRESET'


👉 Fun stories through development into discord v 14...
as ive mentioned, ive been upgrading my bot, wich will hopfully be out verry soon, from v 12 to 14, alot of things changed, and as i was upgrading, i did a few oops, that really stuped!  enjoy

💥starting off, numbers are fun, i may have at first accedently set discord to be running 14 on the wrong version of node  in package.json... that went well (not)

💥when my first feature to be upgraded was the video detector, I commented everything out, including the file wich it collects all its data from, after re-writing everything for it, I finally relized... it wasent an error of the update, it would have still worked just fine if I would have gave it its data!!

💥after that, my next goal was to be able to detect messages again... with the client being no longer all in one, after multiple rounds of errors, i relized i never had the one of the clients intents be GatewayIntentBits.MessageContent 

... yeah, that might of been imprtant... oops!








This new version of Houndbot is called the data update. we now have alot more data to it!!! 



⏩ with this version you can now import your birthday, and on said day he will say happy birthday, a ton of gethering data changes with video gather. and even data to geting roles!  this adds a ton new files and even just regular fixes!!! this took quite some time, so hope you enjoy! and any isues found, or even furture feature requests, please report them in ⏩ houndbot issue report










*/


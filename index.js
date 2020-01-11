require('dotenv').config()
const discord = require('discord.js')
const bot = new discord.Client()
const axios = require('axios')

bot.on('ready', () => {
    console.log(`Bot is live!`)
})

bot.on('message', (msg) => {
    if (msg.content.substring(0, 1) == '!') {
        let commands = msg.content.split(" ")
        let timesRepeated = parseFloat(commands[commands.length - 1])
        if (timesRepeated === NaN) {
            msg.reply('Invalid command :( Try something like !yeet 20')
        }
        else if (timesRepeated > 100) {
            msg.reply("Banana Doppio fact: I can't repeat the same message more than 100 times. Banana Doppio out.");
        }
        else {
            msg.reply('Checking the vibe first!')
            for (let i = 0; i < timesRepeated; i++) {
                let reply = ''
                for (let j = 0; j < commands.length - 1; j++) {
                }
                reply = reply.replace(/!/g, '')
                msg.reply(reply)
            }
        }
    }
    else if (msg.content.substring(0, 1) == ':') {
        msg.react('🤙')
        let seekCommand = msg.content.split(" ")
        let searchString = ''
        for (let i = 0; i < seekCommand.length; i++) {
            searchString += ' ' + seekCommand[i] + ' '
        }

        axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=012519355816500156971:pne8pbul53l&q=${searchString}`)
            .then((res) => {
                if (res.data.items.length > 0) {
                    msg.reply(res.data.items[Math.floor(Math.random() * res.data.items.length)].link)
                }
                else {
                    msg.reply(`Couldn't find anything for ${searchString}`)
                }

            })
            .catch((err) => {
                msg.reply('Sorry! I done goofed while searching :(')
            })

    }
})

bot.login(process.env.AUTH_TOKEN);
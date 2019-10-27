const express = require('express')
const discord = require('discord.js')
const auth = require('./auth.json')
const bot = new discord.Client()

bot.on('ready', () => {
    console.log(`Memester ready to meme VIIIIIBEEEE CHECK`)
})

bot.on('message', (msg) => {
    if (msg.content == '!stawp') {
        return
    }
    if (msg.content.substring(0, 1) == '!') {
        let commands = msg.content.split(" ")
        let timesRepeated = parseFloat(commands[commands.length - 1])
        if (timesRepeated === NaN) {
            msg.reply('Invalid command :( Try something like !yeet 20')
        }
        else {
            msg.reply('Checking the vibe first!')
            for (let i = 0; i < timesRepeated; i++) {
                let reply = ''
                for (let j = 0; j < commands.length - 1; j++) {
                    reply += ' ' + commands[j] + ' '
                }
                reply = reply.replace(/!/g, '')
                msg.reply(reply)
            }
        }
    }
})

bot.login(auth.token)
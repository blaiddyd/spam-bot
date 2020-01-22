require("dotenv").config()
const discord = require("discord.js")
const bot = new discord.Client()
const axios = require("axios")

// prettier-ignore
const allBoards = [
    "a", "c", "w", "m", "cgl", "cm", "n", "jp", "v", "vg", "vp", "vr",
    "co", "g", "tv", "k", "an", "tg", "sp", "asp", "sci", "his", "int",
    "out", "toy", "po", "p", "ck", "lit", "mu", "fa", "3", "gd", "diy",
    "wsg", "qst", "biz", "trv", "fit", "x", "adv", "lgbt", "mlp", "news",
    "wsr", "vip"
]

const excludedBoards = ["f"]

const animeBoards = ["a", "c", "w", "m", "cgl", "cm", "jp", "h", "e", "u", "d", "y"]

const focussedAnimeBoards = ["h", "e", "u", "d", "y"]

const otherBoards = ["x", "lgbt", "mlp", "news"]

const miscBoards = ["b", "r9k", "pol", "bant", "soc", "s4s"]

const pornBoards = ["s", "hc", "hm", "hr", "gif", "aco", "r"]

const getRandomInt = max => {
    return Math.floor(Math.random() * max)
}

const getThreads = html => {
    console.log(...html.matchAll(/"(\d{7,8})":/gm))
    return [...html.matchAll(/"(\d{7,8})":/gm)].map(url => url[1])
}

const getImages = html => {
    console.log(...html.matchAll(/\/(\d*\w.jpg)/gm))
    return [...html.matchAll(/\/(\d*\w.jpg)/gm)].map(url => url[1])
}

bot.on("ready", () => {
    console.log(`Bot is live!`)
})

bot.on("message", msg => {
    switch (msg.content.substring(0, 1)) {
        case "!":
            let commands = msg.content.split(" ")
            let timesRepeated = parseFloat(commands[commands.length - 1])
            if (timesRepeated === NaN) {
                msg.reply("Invalid command :( Try something like !yeet 20")
            } else if (timesRepeated > 20) {
                msg.reply(
                    "Banana Doppio fact: I can't repeat the same message more than 20 times. Banana Doppio out."
                )
            } else {
                msg.reply("Checking the vibe first!")
                for (let i = 0; i < timesRepeated; i++) {
                    let reply = ""
                    for (let j = 0; j < commands.length - 1; j++) {}
                    reply = reply.replace(/!/g, "")
                    msg.reply(reply)
                }
            }
            break
        case ":":
            msg.react("🤙")
            let seekCommand = msg.content.split(" ")
            let searchString = ""
            for (let i = 0; i < seekCommand.length; i++) {
                searchString += " " + seekCommand[i] + " "
            }

            axios
                .get(
                    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=012519355816500156971:pne8pbul53l&q=${searchString}`
                )
                .then(res => {
                    if (res.data.items.length > 0) {
                        msg.reply(
                            res.data.items[Math.floor(Math.random() * res.data.items.length)].link
                        )
                    } else {
                        msg.reply(`Couldn't find anything for ${searchString} :'(`)
                    }
                })
                .catch(() => {
                    msg.reply("Sorry! I done goofed while searching :(")
                })
            break
        case "~":
            msg.react("🍆")
            const sexyCommand = msg.content.split(" ")
            let sexySearch = ""
            for (let i = 0; i < sexyCommand.length; i++) {
                sexySearch += " " + sexyCommand[i] + " "
            }

            axios
                .get(
                    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=012519355816500156971:i348royw1z4&q=${sexySearch}`
                )
                .then(res => {
                    if (res.data.items.length > 0) {
                        msg.reply(
                            res.data.items[Math.floor(Math.random() * res.data.items.length)].link
                        )
                    } else {
                        msg.reply(`Couldn't find any degeneracy for ${sexySearch} UwU`)
                    }
                })
                .catch(err => {
                    console.log(err)
                    msg.reply("Sorry! I done goofed while searching :(")
                })
            break
        case "4":
            msg.react("🌭")

            const FoChanCommand = msg.content.split(" ")[0]

            console.log(FoChanCommand)

            let selectedBoard
            switch (FoChanCommand.toLowerCase()) {
                case "4weeb":
                    selectedBoard = animeBoards[getRandomInt(animeBoards.length - 1)]
                    break
                case "4extraweeb":
                    selectedBoard =
                        focussedAnimeBoards[getRandomInt(focussedAnimeBoards.length - 1)]
                    break
                case "4other":
                    selectedBoard = otherBoards[getRandomInt(otherBoards.length - 1)]
                    break
                case "4misc":
                    selectedBoard = miscBoards[getRandomInt(miscBoards.length - 1)]
                    break
                case "4porn":
                    selectedBoard = pornBoards[getRandomInt(pornBoards.length - 1)]
                    break
                case "4lucky":
                    selectedBoard = allBoards[getRandomInt(allBoards.length - 1)]
                    break
                default:
                    msg.reply(`Use 4weeb, 4extraweeb, 4other, 4misc, 4porn, or 4lucky.`)
                    return
            }

            axios
                .get(`http://boards.4chan.org/${selectedBoard}/catalog`)
                .then(res => {
                    const allThread = getThreads(res.data)
                    const randThread = allThread[getRandomInt(allThread.length - 1)]
                    axios
                        .get(`https://boards.4chan.org/${selectedBoard}/thread/${randThread}`)
                        .then(res => {
                            const allImagesOnThread = getImages(res.data)
                            // const rand = getRandomInt(allImagesOnThread.length)
                            // const randImg = allImagesOnThread[rand];
                            const randImg = allImagesOnThread[0]
                            msg.reply(`http://i.4cdn.org/${selectedBoard}/${randImg}`)
                        })
                        .catch(err => {
                            console.log("Here 1 " + err)
                            msg.reply("Oooh wee something fucked up")
                        })
                })
                .catch(err => {
                    console.log("Here 2 " + err)
                    msg.reply("Awww jeez")
                })
            break
    }
})

bot.login(process.env.AUTH_TOKEN)

const TelegramBot = require("node-telegram-bot-api")

const token = "7571525315:AAGEbf6gbdlEzmArtEQI184qSpW_Ku4PIJE"
const options = {
    polling: true
}

const tesbot = new TelegramBot(token, options)

const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)

tesbot.onText(sayHi, (callback) => {
    tesbot.sendMessage(callback.from.id, "Halo juga")
})

tesbot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const { 
        Infogempa: {
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        } 
    } = await apiCall.json()

    const BMKGImage = BMKG_ENDPOINT + Shakemap

    const ressultText = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
`
    tesbot.sendPhoto(callback.from.id, BMKGImage, {
        caption: ressultText
    })
    // tesbot.sendMessage(callback.from.id, ressultText)
})


// tesbot.on("message", (callback) => {
//     const id = callback.from.id
//     tesbot.sendMessage(id, callback.text)
// })

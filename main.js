const telebot=require("node-telegram-bot-api")

const token="7497993829:AAHoxd2ujgxL7Mq8_mg6_MOd2rFBgKP4Lt8"
const options={
    polling:true
}

const botTele=new telebot(token,options)

const prefix="."

const sayHi= new RegExp(`^${prefix}halo$`)
const gempa= new RegExp(`^${prefix}gempa$`)

botTele.onText(sayHi,(callback)=>{
    botTele.sendMessage(callback.from.id,"halo juga")
})

botTele.onText(gempa,async(callback)=>{
    const BMKG_endpoint = "https://data.bmkg.go.id/DataMKG/TEWS"
    const apiCall = await fetch(BMKG_endpoint+"/autogempa.json")
    const {
        Infogempa:{
            gempa:{
                Jam,Magnitude,Tanggal,Wilayah,Potensi,Kedalaman
            }
        }
    }= await apiCall.json()
    
    const resultText=`
        Waktu: ${Tanggal} | ${Jam}
        Besaran: ${Magnitude} SR
        Wilayah: ${Wilayah}
        Potensi: ${Potensi}
        Kedalaman: ${Kedalaman}
    `
    botTele.sendMessage(callback.from.id,resultText)
})
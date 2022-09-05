//importación necesaria para utilizar funciones sap
const cds       = require("@sap/cds")

//módulo necesario para consumir api's
const axios     = require("axios")

//importación de constantes
const constants = require("../utils/constants.json")

//módulo principal
module.exports = {
  //declaración de función y consumo de api
    getWeather: function () {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=58.3816&lon=34.6037&appid=f0673040c94205c247fb91ee6b12c1b8"
      axios
      .get(url).then(res => {
          console.log("log ----->", constants.messages.fetch_success) //utilización de constantes importadas
          
          getValues(res) //llamada a función
        })
      .catch(err => console.log(err, "log ----->", constants.messages.fetch_error)) //utilización de constantes importadas
  }
}

  const getValues = res => {
    const obj         = {}
    const rd          = res.data
    const cTemp       = toCelsius(rd.main.temp) //llamada a función
    const fullDate    = new Date()
    const shortDate   = fullDate.toLocaleDateString() //convierto fecha a formato d/m/yyyy
    
    //guardo valores dentro de objeto declarado previamente
    obj.temp        = cTemp.toFixed(2) //redondeo decimales
    obj.visibility  = rd.visibility
    obj.speed       = rd.wind.speed
    obj.lat         = rd.coord.lat
    obj.lon         = rd.coord.lon
    obj.timezone    = rd.timezone
    obj.humidity    = rd.main.humidity
    obj.alarm       = alarm(obj.temp) //llamada a función
    obj.date        = shortDate
    obj.season      = getSeason(fullDate) //llamada a función

    insertValues("weather", obj) //llamada a función

    return obj //retorno objeto con data
  }

  const insertValues = (entity, obj) => {
    try {
      //inserto objeto en entidad
      cds.run(INSERT.into(entity).entries(obj))
      console.log("log ----->", entity, constants.messages.entity.insert_success) //utilización de constantes importadas
    } catch (err) {
      console.log(err, "log ----->", constants.messages.entity.insert_error_1, entity, constants.messages.entity.insert_error_2) //utilización de constantes importadas
    }
  }

  const toCelsius = temp => {
    //convierto temperatura C a F
    const celsius = (temp - 32)/1.8000
    
    return celsius //devuelvo temperatura convertida
  }

  const alarm = temp => {
    //condicional para activar true o false en la entidad dependiendo de la temperatura
    return temp < -1 || temp > 32 ? true : false
  }

  const getSeason = (fullDate) => {
    const month = fullDate.getMonth() + 1
    let season = ""

    //condicional devuelve estación del año según el mes
    if (month == 12 || month == 1 || month == 2 || month == 3) {
      season = "summer"
    } else if (month == 4 || month == 5 || month == 6) {
      season = "fall"
    } else if (month == 7 || month == 8 || month == 9) {
      season = "winter"
    } else {
      season = "spring"
    }
    return season
  }

/*
  Verano (21 de diciembre a 20 de marzo).
  Otoño (21 de marzo a 20 de junio).
  Invierno (21 de junio a 20 de septiembre).
  Primavera (21 de septiembre a 20 de diciembre).
*/
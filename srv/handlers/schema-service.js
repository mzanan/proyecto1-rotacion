//importación necesaria para utilizar funciones sap
const cds     = require("@sap/cds")

//importación de archivo con funciones
const modules = require("./service-modules")

//módulo principal
module.exports = cds.service.impl(() => {
  //on served ejecuta lo que contenga antes de que se pongan en funcinamiento los servicios.
  cds.on("served", () => {

    //llamada a la función getWeather dentro del módulo "modules"
    modules.getWeather()
  })
})

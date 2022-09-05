using {OpenWeather as my} from '../db/schema';

//Definición de servicio y exposición de entidad
service Api {
  entity weather as projection on my.weather;
}

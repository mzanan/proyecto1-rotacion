using {cuid} from '@sap/cds/common';

namespace OpenWeather;

//definición de entidad
entity weather {
  temp       : Integer;
  visibility : Integer;
  speed      : Integer;
  lat        : Integer;
  lon        : Integer;
  timezone   : Integer;
  humidity   : Integer;
  alarm      : Boolean;
  date       : Date;
  season     : String;
}

import {DateTime} from 'luxon';
import {
  convertOptionNameFromI18ToLuxon,
} from './convertOptionNameFromI18ToLuxon.ts';

export const formatToLocalDate = (
  secs: number,
  zone: string,
  dayOnly?: boolean,
) => {
  const locale = convertOptionNameFromI18ToLuxon();
if (dayOnly) {
   return DateTime
       .fromSeconds(secs)
       .setLocale(locale)
       .toLocaleString({ weekday: 'short'});
} else {
 return  DateTime
     .fromSeconds(secs)
     .setZone(zone)
     .setLocale(locale)
     .toLocaleString({ year:'numeric', weekday: 'long', month: 'short', day: '2-digit'});
}
};

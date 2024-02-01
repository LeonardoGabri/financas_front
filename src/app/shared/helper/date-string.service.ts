import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateStringService{
  constructor() {}

  addDateToMomentDate(newDate?: string, dateString?: string) {
    if (!newDate) {
      return moment();
    }

    const dateArray: number[] = newDate.split('-').map((item) => Number(item));
    let date = dateString ? moment(dateString) : moment();

    date.year(dateArray[0]);
    date.month(dateArray[1] - 1);
    date.date(dateArray[2]);

    return date;
  }

  addTimeToMomentDate(time?: string, dateString?: string) {
    !dateString && (dateString = moment().format());
    !time && (time = moment().format('HH:mm:ss'));

    const timeArray: number[] = time.split(':').map((item) => Number(item));
    const date = moment(dateString);

    date.hour(Number(timeArray[0]));
    date.minute(Number(timeArray[1]));
    date.second(Number(timeArray[2]));

    return date;
  }

  createDateTimeWithString(
    dateFormat: string,
    timeFormat: string,
    date?: string,
    time?: string
  ) {
    return moment(`${date} ${time}`, `${dateFormat} ${timeFormat}`);
  }
}

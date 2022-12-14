import {format, add, isSaturday, isSunday, isWeekend, parseISO} from "date-fns";
import {ISO_DATE_FORMAT} from "../models/date-consts";

export class DateHelperService {
    public getFormattedDate(date: Date): string {
        let workingDay = date;
        
        if (isWeekend(date)) {
            workingDay = this.getClosestFriday(date);
        }

        return format(workingDay, ISO_DATE_FORMAT);
    }

    public parseIso(isoDate: string): Date {
        return parseISO(isoDate);
    }

    private getClosestFriday(date: Date): Date {
        let daysToAdd = 0;

        if (isSaturday(date)) {
            daysToAdd = -1;
        } else if (isSunday(date)) {
            daysToAdd = -2;
        }

        return add(date, {
            days: daysToAdd
        })
    }
}

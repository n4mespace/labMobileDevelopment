import { Time, Hours, Minutes, Seconds } from './types';

class TimeDZ implements Time {
    hours: Hours = 0;

    minutes: Minutes = 0;

    seconds: Seconds = 0;

    dateObject: Date = new Date();

    static fromObject({ h, m, s }: { h: Hours; m: Minutes; s: Seconds }): Time {
        const time = new TimeDZ();
        time.hours = h;
        time.minutes = m;
        time.seconds = s;
        time.formDateObject();
        return time;
    }

    static fromTime(obj: Time): Time {
        const timeObj = {
            h: obj.hours,
            m: obj.minutes,
            s: obj.seconds
        };
        return TimeDZ.fromObject(timeObj);
    }

    static fromDate(obj: Date): Time {
        const timeObj = {
            h: obj.getHours() as Hours,
            m: obj.getMinutes() as Minutes,
            s: obj.getSeconds() as Seconds
        };
        return TimeDZ.fromObject(timeObj);
    }

    formDateObject(): void {
        this.dateObject = new Date();
        this.dateObject.setHours(this.hours);
        this.dateObject.setMinutes(this.minutes);
        this.dateObject.setSeconds(this.seconds);
    }

    getTime(): string {
        return this.dateObject.toLocaleTimeString();
    }

    addTime(timeDelta: Time): Time {
        const date = timeDelta.dateObject;
        const timePeriodMillis = TimeDZ.getTimePeriodMillis(date);
        const newDateObject = new Date(
            this.dateObject.getTime() + timePeriodMillis
        );
        return TimeDZ.fromDate(newDateObject);
    }

    substractTime(timeDelta: Time): Time {
        const date = timeDelta.dateObject;
        const timePeriodMillis = TimeDZ.getTimePeriodMillis(date);
        const newDateObject = new Date(
            this.dateObject.getTime() - timePeriodMillis
        );
        return TimeDZ.fromDate(newDateObject);
    }

    static add(time1: Time, time2: Time): Time {
        return TimeDZ.fromTime(time1).addTime(time2);
    }

    static substract(time1: Time, time2: Time): Time {
        return TimeDZ.fromTime(time1).substractTime(time2);
    }

    static getTimePeriodMillis(date: Date): number {
        return (
            date.getHours() * 60 * 60 * 1000 +
            date.getMinutes() * 60 * 1000 +
            date.getSeconds() * 1000
        );
    }

    toString(): string {
        return `Time { h:${this.hours} m:${this.minutes} s:${this.seconds} }`;
    }
}

// Testing
const empty = new TimeDZ();
const oneSecond = TimeDZ.fromObject({ h: 0, m: 0, s: 1 });
const midNight = TimeDZ.fromObject({ h: 23, m: 59, s: 59 });
const midDay = TimeDZ.fromTime(empty).addTime(
    TimeDZ.fromObject({ h: 12, m: 0, s: 1 })
);
const dayLight = TimeDZ.fromDate(new Date('2021-08-09T14:30:20'));

console.log(TimeDZ.add(midDay, midNight).getTime()); // 12:00:00 PM
console.log(TimeDZ.substract(empty, oneSecond).getTime()); // 11:59:59 PM
console.log(TimeDZ.add(oneSecond, midNight).getTime()); // 12:00:00 AM
console.log(TimeDZ.add(dayLight, midNight).getTime()); // 2:30:19 PM
console.log(TimeDZ.substract(midDay, oneSecond).getTime()); // 12:00:00 PM

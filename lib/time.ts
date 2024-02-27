/**
 * Represents a time period with a start and end time.
 */
export class Time {
  public periodMinutes: number;
  public start: Date;
  public end: Date;
  constructor(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    const now = Time.nowJST();
    this.start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute
    );
    this.end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute
    );
    this.periodMinutes =
      (this.end.getTime() - this.start.getTime()) / 1000 / 60;
  }
  static isConflict(...args: (Time|undefined)[]) {
    for (let i = 0; i < args.length; i++) {
      for (let j = i + 1; j < args.length; j++) {
        if(args[i]?.isConflict(args[j])) return true;
      }
    }
    return false;
  }
  public isConflict(time?: Time) {
    return (
      time &&
      this.start.getTime() < time.end.getTime() &&
      this.end.getTime() > time.start.getTime()
    );
  }
  public toPeriodString() {
    return `${this.toStartString()}~${this.toEndString()}`;
  }
  public toStartString() {
    return `${this.to2Digits(this.start.getHours())}:${this.to2Digits(
      this.start.getMinutes()
    )}`;
  }
  public toEndString() {
    return `${this.to2Digits(this.end.getHours())}:${this.to2Digits(
      this.end.getMinutes()
    )}`;
  }
  static nowJST() {
    return new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );
  }
  public isTimeOut() {
    return this.start.getTime() - 15 * 60 * 1000 < Time.nowJST().getTime();
  }
  private to2Digits(num: number) {
    return num.toString().length === 1 ? `0${num.toString()}` : num.toString();
  }
  public static fromDate(start: Date, end: Date) {
    return new Time(
      start.getHours(),
      start.getMinutes(),
      end.getHours(),
      end.getMinutes()
    );
  }
}

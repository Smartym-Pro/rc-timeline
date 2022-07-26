import { DateTime } from 'luxon';
import { CalendarEvent } from '../common/interface';

export interface VerticalMonths {
  label: string;
  offset: number;
  monthHeight: number;
}

export const createVerticalMonths = (start: number, finish: number, scaleCoeff = 1): VerticalMonths[] => {
  const monthResult: any = [];
  let offset = 0;
  for (let i = start; i <= finish; i++) {
    const resultDate = DateTime.local().plus({ months: i });
    const monthHeight = resultDate.daysInMonth * scaleCoeff;
    monthResult.push({
      label: `${resultDate.year} ${resultDate.monthShort}`,
      offset,
      monthHeight,
    });
    offset += monthHeight;
  }

  return monthResult;
};

const assignSameMonthIfNoDates = (event: CalendarEvent): CalendarEvent => {
  if (event.endAt && event.startAt) {
    return event;
  }
  if (event.endAt) {
    return { ...event, startAt: event.endAt };
  }
  if (event.startAt) {
    return { ...event, endAt: event.startAt };
  }
  const currentMonth = DateTime.now().toFormat('yyyy-MM-dd');
  return { ...event, startAt: currentMonth, endAt: currentMonth };
};

export const dayZeros = {
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
};

export interface DatesValues {
  startAt: DateTime;
  endAt: DateTime;
  summary?: string;
  id?: string;
  meta: any;
}

export const getFixedDates = (event: CalendarEvent): DatesValues => {
  const { startAt: startDate, endAt: endDate, summary, id, meta } = assignSameMonthIfNoDates(event);
  const firstVal = DateTime.fromISO(startDate).startOf('month').set(dayZeros);
  const secondVal = DateTime.fromISO(endDate).endOf('month').set(dayZeros);
  const startAt = firstVal <= secondVal ? firstVal : secondVal;
  const endAt = secondVal >= firstVal ? secondVal : firstVal;
  return { startAt, endAt, summary, id, meta };
};

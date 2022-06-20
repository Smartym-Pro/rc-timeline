import { DateTime } from 'luxon';

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

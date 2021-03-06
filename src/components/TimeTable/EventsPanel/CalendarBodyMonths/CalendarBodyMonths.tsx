import { CALENDAR_OFFSET_LEFT } from '../../../../common/constants';
import { createVerticalMonths } from '../../../../utils/common';
import React from 'react';

const renderHours = (width: number, startStep: number, finishStep: number, scaleCoeff: number, isAsc: boolean) => {
  const verticalHours = createVerticalMonths(startStep, finishStep, scaleCoeff);
  const yearOffsets = verticalHours.reduce((res, item) => {
    const [key] = item.label.split(' ');
    return { ...res, [key]: item.offset + item.monthHeight };
  }, {});
  const yearOffsetsEntries: any = Object.entries(yearOffsets);
  const yearHeights = yearOffsetsEntries.reduce((res, [year, offset], index) => {
    const style = {
      [isAsc ? 'top' : 'bottom']: index === 0 ? 0 : yearOffsetsEntries[index - 1][1],
      height: index === 0 ? offset : offset - yearOffsetsEntries[index - 1][1],
      left: 0,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid gray',
      borderTop: '1px solid gray',
    };
    return { ...res, [year]: { style } };
  }, {});
  const years = Object.entries(yearHeights).map(([year, item]) => (
    <div key={year} style={(item as any).style} className="Kalend__text Kalend__calendarBodyMonths__text">
      {year}
    </div>
  ));
  const months = verticalHours.map(({ label, offset, monthHeight }) => {
    return (
      <div
        key={label}
        className={'Kalend__calendarBodyMonths__container'}
        style={{ minHeight: monthHeight, [isAsc ? 'top' : 'bottom']: offset, position: 'absolute' }}
      >
        <p
          className="Kalend__text Kalend__calendarBodyMonths__text"
          style={{
            [isAsc ? 'top' : 'bottom']: -4,
            left: 30,
          }}
        >
          {scaleCoeff >= 0.25 && label.split(' ')[1]}
        </p>
        <div
          className="Kalend__text Kalend__calendarBodyMonths__line"
          style={{ [isAsc ? 'top' : 'bottom']: 0, width: width - CALENDAR_OFFSET_LEFT }}
        />
      </div>
    );
  });
  return (
    <>
      {years}
      {months}
    </>
  );
};

const CalendarBodyMonths = ({
  width,
  startStep,
  finishStep,
  height,
  scaleCoeff,
  isAsc,
}: {
  width: number;
  startStep: number;
  finishStep: number;
  height: number;
  scaleCoeff: number;
  isAsc: boolean;
}) => {
  const hours: any = renderHours(width, startStep, finishStep, scaleCoeff, isAsc);
  return (
    <div className="Kalend__calendarBodyMonths__wrapper" style={{ height, width: 90 }}>
      {hours}
    </div>
  );
};

export default React.memo(CalendarBodyMonths);

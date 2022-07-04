import React, { useContext, useEffect } from 'react';
import { Context } from './context/store';
import TimeTable from './components/TimeTable/TimeTable';
import { CalendarEvent } from './common/interface';
import { DateTime } from 'luxon';
import { TopControl } from './components/controls/TopControl';

const Redraw = ({ items }: { items: { startAt: string | undefined; endAt: string | undefined }[] }) => {
  const [, dispatch] = useContext(Context);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const dates = items.reduce(
      (res, cur) => {
        if (cur.startAt && DateTime.fromISO(cur.startAt).ts < res.startAt) {
          res.startAt = DateTime.fromISO(cur.startAt).startOf('month').ts;
        }
        if (cur.endAt && DateTime.fromISO(cur.endAt).ts > res.endAt) {
          res.endAt = DateTime.fromISO(cur.endAt).endOf('month').ts;
        }
        return res;
      },
      { startAt: DateTime.local().ts, endAt: 0 },
    );
    const min = DateTime.fromSeconds(dates.startAt / 1000);
    const max = DateTime.fromSeconds(dates.endAt / 1000);
    const startStep = Math.ceil(min.diff(DateTime.local(), ['months']).months);
    const finishStep = Math.ceil(max.diff(DateTime.local(), ['month']).months);
    dispatch({ type: 'bothSteps', payload: { startStep, finishStep } });
  }, [JSON.stringify(items)]);
  return <></>;
};

const Calendar = (props: { items: CalendarEvent[] }) => {
  return (
    <TopControl>
      <Redraw items={props.items.map(({ startAt, endAt }) => ({ startAt, endAt }))} />;
      <TimeTable events={props.items} />
    </TopControl>
  );
};

export default Calendar;

import React, { useContext, useCallback, useEffect } from 'react';
import { Context } from './context/store';
import TimeTable from './components/TimeTable/TimeTable';
import { CalendarEvent } from './common/interface';
import { DateTime } from 'luxon';
import { TopControl } from './components/controls/TopControl';

const Calendar = (props: { items: CalendarEvent[] }) => {
  const [store, dispatch] = useContext(Context);
  useEffect(() => {
    const dates = props.items.reduce(
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
  }, [props.items]);

  return (
    <TopControl>
      <TimeTable events={props.items ? props.items : []} />
    </TopControl>
  );
};

export default Calendar;

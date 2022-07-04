import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import CalendarBodyMonths from './EventsPanel/CalendarBodyMonths/CalendarBodyMonths';
import EventsPanel from './EventsPanel/EventsPanel';
import { CalendarEvent } from '../../common/interface';
import { Context } from '../../context/store';
import { getComponentsSizes } from '../../utils/sizes';
import { isEqual } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const TypeSwitcher = ({ types, change }: { types: string[]; change: (val: string[]) => void }) => {
  return (
    <div className="Kalend__Calendar__table__type-switcher">
      {['education', 'career', 'projects'].map((type) => (
        <div>
          <input
            type="checkbox"
            checked={types.includes(type)}
            onChange={() => {
              const nextTypes = types.includes(type) ? types.filter((item) => item !== type) : [...types, type];
              change(nextTypes);
            }}
          />{' '}
          {type}
        </div>
      ))}
    </div>
  );
};
const RedrawHeight = ({ items }: { items: { startAt: string | undefined; endAt: string | undefined }[] }) => {
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
    dispatch({ type: 'bothSteps', payload: items.length ? { startStep, finishStep } : { startStep: -39, finishStep: 0 } });
  }, [JSON.stringify(items)]);
  return <></>;
};

const MemoizedEventPanel = React.memo(
  ({
    item,
    startStep,
    scaleCoeff,
    isAsc,
    height,
    type,
  }: {
    item: CalendarEvent[];
    startStep: number;
    scaleCoeff: number;
    isAsc: boolean;
    height: number;
    type: string;
  }) => {
    return <EventsPanel type={type} data={getComponentsSizes(item, startStep, scaleCoeff, isAsc, height)} />;
  },
  (oldP, nextP) => {
    return isEqual(oldP, nextP);
  },
);

const TimeTable = (props: { events: CalendarEvent[] }) => {
  const [visibleTypes, setVisibleTypes] = useState(['projects', 'career', 'education']);
  const style = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    height: 'calc(100% - 20px)',
    width: `calc(100% - ${CALENDAR_OFFSET_LEFT}px)`,
    position: 'relative' as any,
  };
  const [store] = useContext(Context);

  const items = [] as { [type: string]: CalendarEvent[] }[];
  if (visibleTypes.includes('education')) {
    const educations = props.events.filter(({ meta }) => meta?.type === 'educationState');
    items.push({ educationState: educations });
  }
  if (visibleTypes.includes('career')) {
    const careers = props.events.filter(({ meta }) => meta?.type === 'careerState');
    items.push({ careerState: careers });
  }
  if (visibleTypes.includes('projects')) {
    const works = props.events.filter(({ meta }) => !meta?.type || meta?.type === 'workState');
    items.push({ workState: works });
  }

  return (
    <div className="Kalend__Calendar__table-wrapper">
      <TypeSwitcher types={visibleTypes} change={setVisibleTypes} />
      <div
        style={style}
        className="Kalend__Calendar__table Kalend__CalendarBody"
        id="Kalend__timetable"
        // onScroll={handleScroll}
      >
        <RedrawHeight items={[...items.map((item) => Object.values(item)[0]).flat()].map(({ startAt, endAt }) => ({ startAt, endAt }))} />
        <CalendarBodyMonths
          width={store.width}
          startStep={store.startStep}
          finishStep={store.finishStep}
          height={store.height}
          scaleCoeff={store.scaleCoeff}
          isAsc={store.isAsc}
        />
        {items.map((item) => {
          const [type, events] = Object.entries(item)[0];
          return (
            <div key={type} style={{ position: 'relative', width: `${100 / items.length}%` }}>
              {' '}
              <MemoizedEventPanel
                item={events}
                startStep={store.startStep}
                scaleCoeff={store.scaleCoeff}
                isAsc={store.isAsc}
                height={store.height}
                type={type}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeTable;

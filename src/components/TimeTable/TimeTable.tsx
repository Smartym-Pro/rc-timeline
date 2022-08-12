import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import CalendarBodyMonths from './EventsPanel/CalendarBodyMonths/CalendarBodyMonths';
import EventsPanel from './EventsPanel/EventsPanel';
import { CalendarEvents, CalendarEvent } from '../../common/interface';
import { Context } from '../../context/store';
import { getComponentsSizes } from '../../utils/sizes';
import { isEqual } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getFixedDates } from '../../utils/common';

const TypeSwitcher = ({
  visibleTypes,
  allTypes,
  change,
}: {
  visibleTypes: string[];
  allTypes: string[];
  change: (val: string[]) => void;
}) => {
  const notShownTypes = allTypes.filter((type) => !visibleTypes.includes(type));
  return (
    <div className="Kalend__Calendar__table__type-switcher">
      {[...visibleTypes, ...notShownTypes].map((type, index) => (
        <div key={type + index}>
          <input
            type="checkbox"
            checked={visibleTypes.includes(type)}
            onChange={() => {
              const nextTypes = visibleTypes.includes(type) ? visibleTypes.filter((item) => item !== type) : [...visibleTypes, type];
              change(nextTypes);
            }}
          />{' '}
          {type}
        </div>
      ))}
    </div>
  );
};
const RedrawHeight = ({ items }: { items: { startAt: DateTime; endAt: DateTime }[] }) => {
  const [, dispatch] = useContext(Context);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const dates = items.reduce(
      (res, cur) => {
        if (cur.startAt && cur.startAt.ts < res.startAt) {
          res.startAt = cur.startAt.startOf('month').ts;
        }
        if (cur.endAt && cur.endAt.ts > res.endAt) {
          res.endAt = cur.endAt.endOf('month').ts;
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
    items,
    startStep,
    scaleCoeff,
    isAsc,
    height,
    type,
    store,
  }: {
    items: CalendarEvent[];
    startStep: number;
    scaleCoeff: number;
    isAsc: boolean;
    height: number;
    type: string;
    store;
  }) => {
    return <EventsPanel type={type} store={store} data={getComponentsSizes(items, startStep, scaleCoeff, isAsc, height, type)} />;
  },
  (oldP, nextP) => {
    return isEqual(oldP, nextP);
  },
);

const TimeTable = (props: { events: CalendarEvents; eventsTypes: string }) => {
  const [visibleTypes, setVisibleTypes] = useState(Object.keys(props.events));
  const [allTypes, setAllTypes] = useState(Object.keys(props.events));

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setVisibleTypes(Object.keys(props.events));
    setAllTypes(Object.keys(props.events));
  }, [props.eventsTypes]);

  const style = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    height: 'calc(100% - 20px)',
    width: `calc(100% - ${CALENDAR_OFFSET_LEFT}px)`,
    position: 'relative' as any,
  };
  const [store] = useContext(Context);

  const items = visibleTypes.map((key) => ({ [key]: props.events[key] }));

  return (
    <div className="Kalend__Calendar__table-wrapper">
      <TypeSwitcher visibleTypes={visibleTypes} allTypes={allTypes} change={setVisibleTypes} />
      <div style={style} className="Kalend__Calendar__table Kalend__CalendarBody" id="Kalend__timetable">
        <RedrawHeight
          items={[...items.map((item) => Object.values(item)[0]).flat()].map((event) => {
            const { startAt, endAt } = getFixedDates(event);
            return { startAt, endAt };
          })}
        />
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
                items={events}
                startStep={store.startStep}
                scaleCoeff={store.scaleCoeff}
                isAsc={store.isAsc}
                height={store.height}
                type={type}
                store={store}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeTable;

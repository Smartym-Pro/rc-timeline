import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import CalendarBodyMonths from './EventsPanel/CalendarBodyMonths/CalendarBodyMonths';
import EventsPanel from './EventsPanel/EventsPanel';
import { CalendarEvent } from '../../common/interface';
import { Context } from '../../context/store';
import { getComponentsSizes } from '../../utils/sizes';
import {isEqual} from 'lodash';
import React, { useContext } from 'react';

const MemoizedEventPanel = React.memo(
  ({
    item,
    startStep,
    scaleCoeff,
    isAsc,
    height,
  }: {
    item: CalendarEvent[];
    startStep: number;
    scaleCoeff: number;
    isAsc: boolean;
    height: number;
  }) => {
    return <EventsPanel data={getComponentsSizes(item, startStep, scaleCoeff, isAsc, height)} />;
  },
  (oldP, nextP) => {
    return isEqual(oldP, nextP);
  },
);

const TimeTable = (props: { events: CalendarEvent[] }) => {
  const style = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    height: '100%',
    width: `calc(100% - ${CALENDAR_OFFSET_LEFT}px)`,
    position: 'relative' as any,
  };
  const [store] = useContext(Context);
  const careers = props.events.filter(({ meta }) => meta?.type === 'careerState');
  const works = props.events.filter(({ meta }) => !meta?.type || meta?.type === 'workState');
  const educations = props.events.filter(({ meta }) => meta?.type === 'educationState');
  const items = [educations, careers, works].filter((item) => item.length);

  return (
    <div
      style={style}
      className="Kalend__Calendar__table Kalend__CalendarBody"
      id="Kalend__timetable"
      // onScroll={handleScroll}
    >
      <CalendarBodyMonths
        width={store.width}
        startStep={store.startStep}
        finishStep={store.finishStep}
        height={store.height}
        scaleCoeff={store.scaleCoeff}
        isAsc={store.isAsc}
      />
      {items.map((item) => (
        <div key={item[0].id} style={{ position: 'relative', width: `${100 / items.length}%` }}>
          {' '}
          <MemoizedEventPanel
            item={item}
            startStep={store.startStep}
            scaleCoeff={store.scaleCoeff}
            isAsc={store.isAsc}
            height={store.height}
          />
        </div>
      ))}
    </div>
  );
};

export default TimeTable;

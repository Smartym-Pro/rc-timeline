import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import CalendarBodyMonths from './EventsPanel/CalendarBodyMonths/CalendarBodyMonths';
import EventsPanel from './EventsPanel/EventsPanel';
import { EventState } from '../../common/interface';
import React from 'react';

const TimeTable = (props: { events: EventState[] }) => {
  const style = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    height: '100%',
  };

  return (
    <div
      style={style}
      className="Kalend__Calendar__table Kalend__CalendarBody"
      id="Kalend__timetable"
      // onScroll={handleScroll}
    >
      <CalendarBodyMonths />
      <EventsPanel data={props.events} />
    </div>
  );
};

export default TimeTable;

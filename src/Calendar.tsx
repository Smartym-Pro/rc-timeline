import React from 'react';
import TimeTable from './components/TimeTable/TimeTable';
import { CalendarEvents } from './common/interface';
import { TopControl } from './components/controls/TopControl';

const Calendar = (props: { items: CalendarEvents }) => {
  const eventsTypes = Object.keys(props.items).join(',');

  return (
    <TopControl>
      <TimeTable key={eventsTypes} events={props.items} eventsTypes={eventsTypes} />
    </TopControl>
  );
};

export default Calendar;

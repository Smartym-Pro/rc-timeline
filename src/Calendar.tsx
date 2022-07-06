import React from 'react';
import TimeTable from './components/TimeTable/TimeTable';
import { CalendarEvents } from './common/interface';
import { TopControl } from './components/controls/TopControl';

const Calendar = (props: { items: CalendarEvents }) => {
  return (
    <TopControl>
      <TimeTable events={props.items} eventsTypes={Object.keys(props.items).join(',')} />
    </TopControl>
  );
};

export default Calendar;

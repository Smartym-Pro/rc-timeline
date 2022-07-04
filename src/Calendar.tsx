import React, { useContext, useEffect } from 'react';
import { Context } from './context/store';
import TimeTable from './components/TimeTable/TimeTable';
import { CalendarEvent } from './common/interface';
import { TopControl } from './components/controls/TopControl';

const Calendar = (props: { items: CalendarEvent[] }) => {
  return (
    <TopControl>
      <TimeTable events={props.items} />
    </TopControl>
  );
};

export default Calendar;

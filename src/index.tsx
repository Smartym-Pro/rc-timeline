import {
  CalendarEvent,
  NewEventClickData,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
  OnDeleteEventFunc,
} from './common/interface';
import Calendar from './Calendar';
import ConfigLayer from './layers/ConfigLayer';
import DimensionsLayoutLayer from './layers/DimensionsLayoutLayer';
import StoreProvider from './context/store';
import React from 'react';
export type { CalendarEvent };
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnEventDragFinish = OnEventDragFinishFunc;

export interface TimelineProps {
  items?: CalendarEvent[];
  onNewEventClick?: OnNewEventClickFunc;
  onEventClick?: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  onDeleteEvent?: OnDeleteEventFunc;
  sortDirection?: 'ASC' | 'DESC'; 
}

// use any as JSX was causing errors for some cases
const Timeline = (props: TimelineProps) => {
  // basic validation
  return (
    <div className="Kalend__Calendar__root Kalend__main">
      <StoreProvider {...props}>
        <ConfigLayer {...props}>
          <DimensionsLayoutLayer>
            <Calendar items={props.items as CalendarEvent[]} />
          </DimensionsLayoutLayer>
        </ConfigLayer>
      </StoreProvider>
    </div>
  );
};

export default Timeline;

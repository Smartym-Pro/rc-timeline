import {
  CalendarEvent,
  CalendarEvents,
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
import React, { useRef } from 'react';
import { isEqual } from 'lodash';
export type { CalendarEvent };
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnEventDragFinish = OnEventDragFinishFunc;
export type { CalendarEvents };

export interface TimelineProps {
  items?: { [type: string]: CalendarEvent[] };
  onNewEventClick?: OnNewEventClickFunc;
  onEventClick?: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  onDeleteEvent?: OnDeleteEventFunc;
  sortDirection?: 'ASC' | 'DESC';
  preventUpdate?: boolean;
}

const MemoizedCalendar = React.memo(
  ({ props }: { props: TimelineProps }) => (
    <div className="Kalend__Calendar__root Kalend__main">
      <StoreProvider {...props}>
        <ConfigLayer {...props}>
          <DimensionsLayoutLayer>
            <Calendar items={props.items as CalendarEvents} />
          </DimensionsLayoutLayer>
        </ConfigLayer>
      </StoreProvider>
    </div>
  ),
  (oldP, nextP) => isEqual(oldP, nextP),
);

const Timeline = (props: TimelineProps) => {
  const propsRef = useRef({} as TimelineProps);
  if (!props.preventUpdate) {
    propsRef.current = props;
  }

  return <MemoizedCalendar props={props} />;
};

export default Timeline;

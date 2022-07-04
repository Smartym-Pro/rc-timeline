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
import React, { useRef } from 'react';
import {isEqual} from 'lodash';
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
  preventUpdate?: boolean;
}

const MemoizedCalendar = React.memo(
  ({ props, items }: { props: TimelineProps; items: CalendarEvent[] }) => (
    <div className="Kalend__Calendar__root Kalend__main">
      <StoreProvider {...props}>
        <ConfigLayer {...props}>
          <DimensionsLayoutLayer>
            <Calendar items={items as CalendarEvent[]} />
          </DimensionsLayoutLayer>
        </ConfigLayer>
      </StoreProvider>
    </div>
  ),
  (oldP, nextP) => isEqual(oldP.items, nextP.items),
);

const Timeline = (props: TimelineProps) => {
  const itemsRef = useRef([] as CalendarEvent[]);
  if (!props.preventUpdate) {
    itemsRef.current = props.items as CalendarEvent[];
  }

  return <MemoizedCalendar props={props} items={itemsRef.current} />;
};

export default Timeline;

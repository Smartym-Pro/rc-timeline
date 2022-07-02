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
import React, { useState, useLayoutEffect } from 'react';
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

const Timeline = (props: TimelineProps) => {
  const [items, setItems] = useState([] as CalendarEvent[]);

  React.useLayoutEffect(() => {
    console.log(props.preventUpdate);
    if (!props.preventUpdate) {
      setItems(props.items as CalendarEvent[]);
    }
  }, [props.items, props.preventUpdate]);

  const calendar = React.useMemo(() => {
    return (
      <div className="Kalend__Calendar__root Kalend__main">
        <StoreProvider {...props}>
          <ConfigLayer {...props}>
            <DimensionsLayoutLayer>
              <Calendar items={items as CalendarEvent[]} />
            </DimensionsLayoutLayer>
          </ConfigLayer>
        </StoreProvider>
      </div>
    );
  }, [items]);

  return <>{calendar}</>;
};

export default Timeline;

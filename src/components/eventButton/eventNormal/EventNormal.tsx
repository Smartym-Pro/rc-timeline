import { CalendarEvent } from '../../../common/interface';
import EventSummary from '../components/eventSummary/EventSummary';
import React from 'react';
interface EventNormalProps {
  event: CalendarEvent;
}

const EventNormal = (props: EventNormalProps) => {
  const { event } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '-webkit-fill-available',
      }}
    >
      <EventSummary summary={event.summary} />
    </div>
  );
};

export default EventNormal;

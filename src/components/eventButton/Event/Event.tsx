import { CalendarEvent } from '../../../common/interface';
import React from 'react';
interface EventNormalProps {
  event: CalendarEvent;
}

const Event = (props: EventNormalProps) => {
  const { event } = props;

  return (
    <div className="Kalend__Event">
      <p className="Kalend__text Kalend__Event__summary Kalend__text-light" dangerouslySetInnerHTML={{ __html: event.summary || '' }}></p>
    </div>
  );
};

export default Event;
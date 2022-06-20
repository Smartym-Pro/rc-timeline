import { CalendarEvent } from '../../../common/interface';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { disableTouchDragging } from '../../eventButton/EventButton.utils';
import { createVerticalMonths } from '../../../utils/common';
import { useContext, useRef, useState } from 'react';
//import CurrentHourLine from '../../currentHourLine/CurrentHourLine';
import EventButton from '../../eventButton/EventButton';
import { getDateFromPosition } from '../../../utils/sizes';
import React from 'react';
import { EventState } from '../../../common/interface';

const renderEvents = (dataset: EventState[]) => {
  return dataset.map((eventRaw: EventState) => {
    const item: CalendarEvent = eventRaw;
    return <EventButton key={item.id} item={eventRaw} />;
  });
};

export const HOUR_DIVIDER = 4;

interface EventsPanelProps {
  data: EventState[];
}
const EventsPanel = (props: EventsPanelProps) => {
  const { data } = props;
  const [store] = useContext(Context);
  const { width, callbacks, isAsc } = store;
  const { onNewEventClick } = callbacks;

  const [offsetTop, setOffsetTop] = useState<any>(null);
  const [offsetTopEnd, setOffsetTopEnd] = useState<any>(null);
  const startAt: DateTime = useRef(null);
  const endAt: DateTime = useRef(null);
  const [startAtState, setStartAt] = useState<DateTime | null>(null);
  const [endAtState, setEndAt] = useState<DateTime | null>(null);

  // const [isDraggingNewEvent, setIsDraggingNewEvent] = useState(false);
  const newEventStartOffset = useRef(null as null | number);
  const newEventEndOffset = useRef(null as null | number);
  const startAtRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isUpdating = useRef(false);

  const style: any = {
    position: 'absolute',
    top: offsetTop,
    height: offsetTopEnd - offsetTop,
    background: store.style.primaryColor,
    width: '100%',
    zIndex: 9,
    borderRadius: 8,
    opacity: 0.8,
  };

  const onMove = (e) => {
    isDraggingRef.current = true;
    // setIsDraggingNewEvent(true);

    e.preventDefault();
    e.stopPropagation();

    if (disableTouchDragging(e)) {
      return;
    }

    // Get column element for day, where event is placed
    const drawPanelElement: Element | null = document.getElementById(`Kalend__draw-panel`);
    if (!drawPanelElement) {
      return;
    }
    const touches: any = e.nativeEvent?.touches?.[0];
    const drawPanelElementRect = drawPanelElement.getBoundingClientRect();

    let y: number;
    // handle touch movement
    if (touches) {
      y = touches.clientY - drawPanelElementRect.top;
    } else {
      // handle mouse movement
      y = e.clientY - drawPanelElementRect.top;
    }

    // initial dragging
    if (newEventStartOffset.current === null) {
      setOffsetTop(y);
      const startAtValue = getDateFromPosition(y / store.scaleCoeff, store);
      startAtRef.current = startAtValue;
      startAt.current = startAtValue;
      setStartAt(startAtValue);

      setOffsetTop(y);
      setOffsetTopEnd(y);
      newEventStartOffset.current = y;
      newEventEndOffset.current = y;

      startAtRef.current = startAtValue;
      endAt.current = startAtValue;
      setEndAt(startAtValue);

      return;
    }

    // handle dragging up
    if (newEventStartOffset.current && y < newEventStartOffset.current) {
      setOffsetTop(y);
      const startAtValue = getDateFromPosition(y / store.scaleCoeff, store);

      startAtRef.current = startAtValue;
      startAt.current = startAtValue;
      setStartAt(startAtValue);
      return;
    }

    // handle dragging down
    setOffsetTopEnd(y);

    const endAtValue = getDateFromPosition(y / store.scaleCoeff, store);
    endAt.current = endAtValue;
    setEndAt(endAtValue);
  };

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param event
   */
  const onMouseUp = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // clean listeners
    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('mousemove', onMove, true);

    const targetClass = event.target.className;

    // prevent propagating when clicking on event due to listeners
    if (targetClass.indexOf('Kalend__Event') !== -1) {
      return;
    }

    if (!isDraggingRef.current) {
      // handleEventClickInternal(event);
      return;
    }

    if (isUpdating.current) {
      return;
    }

    if (onNewEventClick && isDraggingRef.current) {
      isUpdating.current = true;

      if (!startAt?.current?.toUTC()?.toString()) {
        isDraggingRef.current = false;
        isUpdating.current = false;
        return;
      }

      isDraggingRef.current = false;
      newEventStartOffset.current = null;
      const chages = store.isAsc
        ? {
            startAt: startAt.current?.startOf('month').toISO(),
            endAt: endAt.current?.startOf('month').toISO(),
          }
        : {
            endAt: startAt.current?.startOf('month').toISO(),
            startAt: endAt.current?.startOf('month').toISO(),
          };

      onNewEventClick(
        {
          event,
          ...chages,
        },
        event,
      );
    }

    isDraggingRef.current = false;
    isUpdating.current = false;
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: MouseEvent) => {
    if (disableTouchDragging(e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
  };

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    // if (isDraggingRef.current) {
    //   onMouseUp(e);
    //   return;
    // }

    onMouseDownLong(e as any);
  };

  const verticalMonths = createVerticalMonths(store.startStep, store.finishStep, store.scaleCoeff);
  const panelStyle = {
    width: width,
    height: verticalMonths.length
      ? verticalMonths[verticalMonths.length - 1].offset + verticalMonths[verticalMonths.length - 1].monthHeight
      : 0,
    overflow: 'hidden',
  };

  const dataForDrawPanel: any = data;
  /*const nowPosition: number =
    dateNow.diff(DateTime.local().set({ hour: 0, minute: 0, second: 0 }), 'minutes').toObject().minutes / (60 / hourHeight);*/

  const handleCloseNewEventDrag = (e?) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setOffsetTopEnd(null);
    setOffsetTop(null);
    // setIsDraggingNewEvent(false);
    isDraggingRef.current = false;
    newEventStartOffset.current = null;
    newEventEndOffset.current = null;
    startAt.current = null;
    endAt.current = null;
    setStartAt(null);
    setEndAt(null);

    isUpdating.current = false;
  };

  return (
    <div id="Kalend__draw-panel" style={panelStyle} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className="Kalend__draw-panel">
      {/*<CurrentHourLine />*/}
      {dataForDrawPanel && dataForDrawPanel.length > 0 ? renderEvents(dataForDrawPanel) : null}

      {isDraggingRef.current ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 8,
          }}
          onClick={handleCloseNewEventDrag}
        />
      ) : null}
      {isDraggingRef.current ? (
        <div style={style}>
          <div
            style={{
              paddingTop: 4,
              paddingLeft: 4,
              fontSize: 12,
            }}
          >
            <p style={{ color: 'white' }}>Project</p>
            <p style={{ color: 'white' }}>
              {startAtState ? startAtState.year + ':' + startAtState.monthShort : ''} -{' '}
              {endAtState ? endAtState.year + ':' + endAtState.monthShort : ''}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventsPanel;

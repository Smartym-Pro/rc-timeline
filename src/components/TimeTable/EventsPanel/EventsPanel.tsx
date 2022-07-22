import { DateTime } from 'luxon';
import { disableTouchDragging } from '../../EventButton/utils/EventButton.utils';
import { createVerticalMonths } from '../../../utils/common';
import { useRef, useState } from 'react';
import EventButton from '../../EventButton/EventButton';
import { getDateFromPosition } from '../../../utils/sizes';
import React from 'react';
import { EventState } from '../../../common/interface';

export const HOUR_DIVIDER = 4;

interface EventsPanelProps {
  data: EventState[];
  type: string;
  store;
}
const EventsPanel = (props: EventsPanelProps) => {
  const { data, type = 'workState' } = props;
  const { store } = props;
  const { callbacks } = store;
  const { onNewEventClick } = callbacks;

  const [offsetTop, setOffsetTop] = useState<any>(null);
  const [offsetTopEnd, setOffsetTopEnd] = useState<any>(null);
  const [startAtState, setStartAt] = useState<DateTime | null>(null);
  const [endAtState, setEndAt] = useState<DateTime | null>(null);

  const startAt: DateTime = useRef(null);
  const endAt: DateTime = useRef(null);
  const newEventStartOffset = useRef(null as null | number);
  const isDragging = useRef(false);
  const isUpdatingExternalData = useRef(false);

  const style: any = {
    position: 'absolute',
    top: offsetTop,
    height: offsetTopEnd - offsetTop,
    background: store.style.primaryColor,
    width: '100%',
    zIndex: 9,
    borderRadius: 8,
    opacity: 0.8,
    color: 'white',
  };

  const onMove = (e) => {
    isDragging.current = true;

    e.preventDefault();
    e.stopPropagation();

    if (disableTouchDragging(e)) {
      return;
    }

    // Get column element for day, where event is placed
    const drawPanelElement: Element | null = document.getElementById(`Kalend__draw-panel${type}`);
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
      setOffsetTopEnd(y);
      const startAtValue = getDateFromPosition(y / store.scaleCoeff, store);
      setStartAt(startAtValue);
      setEndAt(startAtValue);
      startAt.current = startAtValue;
      endAt.current = startAtValue;
      newEventStartOffset.current = y;
      return;
    }

    // handle dragging up
    if (newEventStartOffset.current && y < newEventStartOffset.current) {
      setOffsetTop(y);
      const startAtValue = getDateFromPosition(y / store.scaleCoeff, store);
      setStartAt(startAtValue);
      startAt.current = startAtValue;
      return;
    }

    // handle dragging down
    setOffsetTopEnd(y);
    const endAtValue = getDateFromPosition(y / store.scaleCoeff, store);
    setEndAt(endAtValue);
    endAt.current = endAtValue;
  };

  const onMouseUp = (event) => {
    event.stopPropagation();
    event.preventDefault();

    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('mousemove', onMove, true);

    if (!isDragging.current) {
      return;
    }

    if (isUpdatingExternalData.current) {
      return;
    }

    if (onNewEventClick && isDragging.current) {
      isUpdatingExternalData.current = true;

      if (!startAt?.current?.toUTC()?.toISO()?.toString()) {
        isDragging.current = false;
        isUpdatingExternalData.current = false;
        return;
      }

      isDragging.current = false;
      newEventStartOffset.current = null;
      const changes = store.isAsc
        ? {
            startAt: startAt.current?.startOf('month').toISO(),
            endAt: endAt.current?.endOf('month').toISO(),
          }
        : {
            endAt: startAt.current?.endOf('month').toISO(),
            startAt: endAt.current?.startOf('month').toISO(),
          };

      onNewEventClick(
        {
          event,
          ...changes,
          meta: { type },
        },
        event,
      );
    }

    isDragging.current = false;
    isUpdatingExternalData.current = false;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disableTouchDragging(e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
  };

  const verticalMonths = createVerticalMonths(store.startStep, store.finishStep, store.scaleCoeff);
  const panelStyle = {
    width: '100%',
    height: verticalMonths.length
      ? verticalMonths[verticalMonths.length - 1].offset + verticalMonths[verticalMonths.length - 1].monthHeight
      : 0,
    overflow: 'hidden',
  };

  const dataForDrawPanel: EventState[] = data;
  const dynamicDates = [
    <span>{startAtState ? startAtState.year + ':' + startAtState.monthShort : ''}</span>,
    <span>{endAtState ? endAtState.year + ':' + endAtState.monthShort : ''}</span>,
  ];

  return (
    <div id={`Kalend__draw-panel${type}`} style={panelStyle} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className="Kalend__draw-panel">
      {dataForDrawPanel && dataForDrawPanel.length > 0
        ? dataForDrawPanel.map((eventRaw: EventState) => {
            return <EventButton key={eventRaw.id} item={eventRaw} store={store} />;
          })
        : null}
      {isDragging.current ? (
        <div style={style}>
          <div
            style={{
              paddingTop: 4,
              paddingLeft: 4,
              fontSize: 12,
            }}
          >
            <p style={{ color: 'white' }}>Project</p>
            {store.isAsc ? (
              <>
                {dynamicDates[0]}-{dynamicDates[1]}
              </>
            ) : (
              <>
                {dynamicDates[1]}-{dynamicDates[0]}
              </>
            )}
            <p style={{ color: 'white' }}></p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventsPanel;

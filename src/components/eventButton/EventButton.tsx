import { useLayoutEffect, useReducer, useRef } from 'react';
import React from 'react';
import { EventStyle, CalendarEvent, EventState } from '../../common/interface';
import { Store } from '../../context/store';
import { onMoveEvent, onResizeEvent } from './utils/dragging';
import { disableTouchDragging, eventButtonInitialState } from './EventButton.utils';
import Event from './eventNormal/EventNormal';
import stateReducer from '../../utils/stateReducer';
import { getDateFromPosition } from '../../utils/sizes';

// ref to cancel timout
let timeoutRef: any;

const EventButton = ({ item, store }: { item: EventState; store }) => {
  const [state, dispatchState]: any = useReducer(stateReducer, eventButtonInitialState);
  const setState = (stateName: string, data: number | string | boolean): void => {
    const payload = { stateName, data };
    dispatchState({ state, payload });
  };

  // store values as refs to access them in event listener
  const offsetTopRef = useRef(state.offsetTop);
  const draggingRef = useRef(false);
  const isResizing = useRef(false);
  const eventWasChangedRef = useRef(false);
  const endAtRef = useRef(null);

  const { callbacks } = store as Store;

  const { onEventClick, onEventDragFinish, onDeleteClick } = callbacks;

  const style: EventStyle = {
    position: 'absolute',
    height: state.height !== null ? state.height : item.height,
    width: state.width !== null ? state.width : item.width || '100%',
    top: state.offsetTop !== null ? state.offsetTop : item.offsetTop,
    left: state.offsetLeft !== null ? state.offsetLeft : item.offsetLeft,
    zIndex: state.zIndex || item.zIndex,
    // border: state.zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    visibility: 'visible',
    color: 'white',
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (draggingRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      draggingRef.current = false;
      return;
    }
    if (onEventClick) {
      onEventClick(item, e);
    }
  };

  const setLayout = (layout: EventState) => {
    setState('initialTop', layout.offsetTop);
    setState('initialLeft', layout.offsetLeft);
    setState('offsetTop', layout.offsetTop);
    setState('offsetLeft', layout.offsetLeft);
    setState('startAt', layout.startAt);
    setState('width', layout.width);
    setState('height', layout.height);
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    setLayout(item);
  }, [item]);

  const initMove = () => {
    if (!draggingRef.current) {
      draggingRef.current = true;
    }

    setState('width', '100%');
    setState('offsetLeft', 0);
  };

  const onResize = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disableTouchDragging(e)) {
      return;
    }

    isResizing.current = true;

    onResizeEvent(e, endAtRef, state.offsetTop, setState, item.meta?.type);
  };

  const onMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disableTouchDragging(e)) {
      return;
    }

    onMoveEvent(e, draggingRef, eventWasChangedRef, offsetTopRef, setState, item.meta?.type);
  };

  const onMouseUpResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // clean listeners
    document.removeEventListener('mouseup', onMouseUpResize as any, true);
    document.removeEventListener('mousemove', onResize, true);

    // add data to callback
    if (onEventDragFinish) {
      const nextEndAt = endAtRef.current ? getDateFromPosition(endAtRef.current / store.scaleCoeff, store) : null;

      const changes = store.isAsc
        ? {
            startAt: item.startAt.startOf('month').toISO(),
            endAt: nextEndAt ? nextEndAt.endOf('month').toISO() : item.endAt.endOf('month').toISO(),
          }
        : {
            startAt: nextEndAt ? nextEndAt.startOf('month').toISO() : item.startAt().startOf('month').toISO(),
            endAt: item.endAt.startOf('month').toISO(),
          };
      const reference = store.isAsc ? item.endAt : item.startAt;
      if (reference.c.year === nextEndAt.c.year && reference.c.month === nextEndAt.c.month) {
        setLayout(item); // month's line not crossed, back to previous state
      }
      const updatedEvent = {
        ...item,
        ...changes,
      };
      onEventDragFinish(updatedEvent);
    }

    endAtRef.current = null;
    isResizing.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param e
   */
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // clean listeners
    document.removeEventListener('mouseup', onMouseUp as any, true);
    document.removeEventListener('mousemove', onMove, true);

    // clear timeout
    clearTimeout(timeoutRef);

    if (!eventWasChangedRef.current) {
      setState('offsetLeft', state.offsetLeft);
      setState('width', state.width);
      setState('isDragging', false);
      draggingRef.current = false;

      return;
    }

    eventWasChangedRef.current = false;

    if (!draggingRef.current) {
      return;
    }

    setTimeout(() => {
      draggingRef.current = false;
      setState('isDragging', false);
    }, 100);

    // add data to callback
    if (onEventDragFinish) {
      let newEvent: CalendarEvent | null = null;
      const offsetY = store.isAsc ? offsetTopRef.current : store.height - offsetTopRef.current;
      const elOffset = store.isAsc ? item.offsetTop : store.height - item.offsetTop;
      const dayDelta = (offsetY - elOffset) / store.scaleCoeff;
      const newStartAt = item.startAt.plus({ day: dayDelta }).startOf('month');
      const monthDelta = newStartAt.diff(item.startAt, ['month']).months;
      const newEndAt = item.endAt.plus({ month: monthDelta }).endOf('month');
      newEvent = {
        ...item,
        startAt: store.isAsc ? newStartAt.toISO() : newStartAt.plus({ month: 1 }).toISO(),
        endAt: store.isAsc ? newEndAt.toISO() : newEndAt.plus({ month: 1 }).toISO(),
      };

      const unchangedDelta = store.isAsc ? 0 : -1;
      if (monthDelta === unchangedDelta) {
        // month's line not crossed, restore previous state
        setLayout(item);
      }
      if (newEvent) {
        onEventDragFinish(newEvent);
      }
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseDownResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disableTouchDragging(e as any) || !onEventDragFinish) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onResize, true);
    document.addEventListener('mouseup', onMouseUpResize as any, true);
  };

  const onMouseDownLong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState('isDragging', true);
    draggingRef.current = true;

    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp as any, true);

    // set temp state while dragging
    initMove();
  };

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isResizing.current) {
      return;
    }

    // add timeout to differentiate from normal clicks
    timeoutRef = setTimeout(() => {
      onMouseDownLong(e);
    }, 120);
  };

  return (
    <div
      id={item.id}
      style={style}
      className={`Kalend__button Kalend__ButtonBase Kalend__Event-normal ${state.isDragging ? 'Kalend__EventButton__elevation' : ''} ${(
        item.meta?.type || ''
      )
        .split(' ')
        .join('-')
        .toLowerCase()}_background-color`}
      onClick={handleEventClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onDeleteClick) {
            onDeleteClick(item.id, item.meta?.type as string);
          }
        }}
      >
        &times;
      </button>
      <Event event={item} />
      {isResizing.current ? (
        <div
          className={'Kalend__EventButton__resizing_wrapper'}
          onClick={() => {
            isResizing.current = false;
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          height: 5,
          width: '100%',
          background: 'transparent',
          zIndex: isResizing.current ? 999 : 9,
          cursor: 'n-resize',
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
          isResizing.current = true;
        }}
        onMouseDown={onMouseDownResize}
        onMouseUp={onMouseUpResize}
      />
    </div>
  );
};

export default React.memo(EventButton, (oldP, nextP) => {
  return JSON.stringify(oldP) === JSON.stringify(nextP);
});

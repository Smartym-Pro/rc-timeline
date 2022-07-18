import { Callbacks } from '../common/interface';
import { Context } from '../context/store';
import { TimelineProps } from '../index';
import { useContext, useEffect } from 'react';
import { isEqualWith, isFunction } from 'lodash';
import { useRef } from 'react';
// eslint-disable-next-line
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};
export const createCallbacks = (): Callbacks => {
  return {
    onEventDragFinish: emptyFunction,
    onEventClick: emptyFunction,
    onNewEventClick: emptyFunction,
    onDeleteClick: emptyFunction,
  };
};

const ConfigLayer = (props: TimelineProps & { children: JSX.Element }) => {
  const [, dispatch] = useContext(Context);
  const ref = useRef(null as any);

  useEffect(() => {
    const funcComp = (v1, v2) => (isFunction(v1) && isFunction(v2) ? `${v1}` === `${v2}` : undefined);
    if (
      ref.current &&
      isEqualWith(props.onEventClick, ref.current.onEventClick, funcComp) &&
      isEqualWith(props.onEventDragFinish, ref.current.onEventDragFinish, funcComp) &&
      isEqualWith(props.onDeleteEvent, ref.current.onDeleteEvent, funcComp) &&
      isEqualWith(props.onNewEventClick, ref.current.onNewEventClick, funcComp) &&
      props.sortDirection === ref.current.sortDirection
    ) {
      return;
    }
    const setContext = (type: string, payload: any) => {
      dispatch({ type, payload });
    };
    setContext('callbacks', {
      onEventDragFinish: props.onEventDragFinish,
      onEventClick: props.onEventClick,
      onNewEventClick: props.onNewEventClick,
      onDeleteClick: props.onDeleteEvent,
    });
    setContext('isAsc', props.sortDirection === 'ASC' ? true : false);
    ref.current = props;
  }, [props, dispatch]);

  return props.children;
};

export default ConfigLayer;

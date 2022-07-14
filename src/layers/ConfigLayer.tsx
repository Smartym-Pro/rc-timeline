import { Callbacks } from '../common/interface';
import { Context } from '../context/store';
import { TimelineProps } from '../index';
import { useContext, useEffect } from 'react';
// eslint-disable-next-line
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};
export const createCallbacks = (props: TimelineProps): Callbacks => {
  return {
    onEventDragFinish: props.onEventDragFinish || undefined,
    onEventClick: props.onEventClick || emptyFunction,
    onNewEventClick: props.onNewEventClick || emptyFunction,
    onDeleteClick: props.onDeleteEvent || emptyFunction,
  };
};

const ConfigLayer = (props: TimelineProps & { children: JSX.Element }) => {
  const [, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const initFromProps = () => {
    const callbacks = createCallbacks(props);
    setContext('callbacks', callbacks);
    setContext('isAsc', props.sortDirection === 'ASC' ? true : false);
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    initFromProps();
  }, []);

  return props.children;
};

export default ConfigLayer;

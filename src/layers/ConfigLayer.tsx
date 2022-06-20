import { Callbacks } from '../common/interface';
import { Context } from '../context/store';
import { KalendProps } from '../index';
import { useContext, useEffect, useState } from 'react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};
export const createCallbacks = (props: KalendProps): Callbacks => {
  return {
    onEventDragFinish: props.onEventDragFinish || undefined,
    onEventClick: props.onEventClick || emptyFunction,
    onNewEventClick: props.onNewEventClick || emptyFunction,
    onDeleteClick: props.onDeleteEvent || emptyFunction,
  };
};

const ConfigLayer = (props: KalendProps & { children: JSX.Element }) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const initFromProps = () => {
    const callbacks = createCallbacks(props);
    setContext('callbacks', callbacks);
    setContext('isAsc', props.startsFromTop);
  };

  useEffect(() => {
    initFromProps();
  }, []);

  useEffect(() => {
    initFromProps();
  }, []);

  return props.children;
};

export default ConfigLayer;

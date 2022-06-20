import { Context } from '../context/store';
import { useContext, useEffect } from 'react';
import { CALENDAR_OFFSET_LEFT } from '../common/constants';
import React from 'react';

const DimensionsLayoutLayer = (props: { children: any }) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload) => {
    dispatch({ type, payload });
  };

  useEffect(() => {
    const el = document?.querySelector('.Kalend__Calendar__root');

    if (!el) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entryRect = entries[0].contentRect;

      setContext('width', entryRect.width - CALENDAR_OFFSET_LEFT);
    });

    resizeObserver.observe(el);
  }, [document?.querySelector('.Kalend__Calendar__root')]);

  useEffect(() => {
    const el = document?.querySelector('.Kalend__Calendar__root');

    if (!el) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entryRect = entries[0].contentRect;

      const width = entryRect.width;

      setContext('width', entryRect.width - CALENDAR_OFFSET_LEFT);
    });

    resizeObserver.observe(el);
  }, []);

  return props.children;
};

export default DimensionsLayoutLayer;

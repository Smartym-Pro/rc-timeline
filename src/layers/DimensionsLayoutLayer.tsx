import { Context } from '../context/store';
import { useContext, useEffect } from 'react';
import { CALENDAR_OFFSET_LEFT } from '../common/constants';
// eslint-disable-next-line
import React from 'react';

const DimensionsLayoutLayer = (props: { children: any }) => {
  const [, dispatch] = useContext(Context);
  const setContext = (type: string, payload) => {
    dispatch({ type, payload });
  };
  /* eslint-disable react-hooks/exhaustive-deps */
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
  }, []);

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
  }, []);

  return props.children;
};

export default DimensionsLayoutLayer;

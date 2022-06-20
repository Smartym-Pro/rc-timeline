import React, { useContext, useCallback } from 'react';
import { Context } from '../src/context/store';
import TimeTable from './components/TimeTable/TimeTable';
import { getComponentsSizes } from '../src/utils/sizes';
import { CalendarEvent } from '../src/common/interface';

const Calendar = (props: { items: CalendarEvent[] }) => {
  const [store, dispatch] = useContext(Context);
  const changeMonth = useCallback(
    (type: 'startStep' | 'finishStep', payload) => {
      dispatch({
        type: store.isAsc ? type : type === 'finishStep' ? 'startStep' : 'finishStep',
        payload: store.isAsc ? payload : -1 * payload,
      });
    },
    [store.isAsc],
  );
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', paddingBottom: 5, paddingLeft: 30 }}>
        <div style={{ display: 'flex' }}>
          <button onClick={() => dispatch({ type: 'isAsc' })}>{store.isAsc ? <span>&#8595;</span> : <span>&#8593;</span>}</button>
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={() => changeMonth('startStep', -6)}>+</button>
          <button onClick={() => changeMonth('startStep', 6)}>-</button>
        </div>
        <div style={{ display: 'flex', paddingLeft: '30px' }}>
          <button onClick={() => dispatch({ type: 'scaleCoeff', payload: -1 })}>+</button>
          <button onClick={() => dispatch({ type: 'scaleCoeff', payload: 1 })}>-</button>
          {store.scaleCoeff}
        </div>
      </div>

      <div style={{ position: 'relative', height: store.height }}>
        <TimeTable
          events={props.items ? getComponentsSizes(props.items, store.startStep, store.scaleCoeff, store.isAsc, store.height) : []}
        />
      </div>
      <div style={{ display: 'flex', paddingTop: 5, paddingLeft: 30 }}>
        <button onClick={() => changeMonth('finishStep', 6)}>+</button>
        <button onClick={() => changeMonth('finishStep', -6)}>-</button>
      </div>
    </div>
  );
};

export default Calendar;

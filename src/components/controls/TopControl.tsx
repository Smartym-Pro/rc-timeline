import React, { useContext, PropsWithChildren } from 'react';
import { Context } from '../../context/store';

export const TopControl = ({ children }: PropsWithChildren<{}>) => {
  const [store, dispatch] = useContext(Context);
  const changeMonth = (type: 'startStep' | 'finishStep', payload) => {
    dispatch({
      type: store.isAsc ? type : type === 'finishStep' ? 'startStep' : 'finishStep',
      payload: store.isAsc ? payload : -1 * payload,
    });
  };
  return (
    <div className="top-control__wrapper">
      <div className="top-control">
        <div style={{ display: 'flex' }}>
          <button onClick={() => dispatch({ type: 'isAsc' })}>direction:{store.isAsc ? <span>&#8595;</span> : <span>&#8593;</span>}</button>
        </div>
        <div className="top-control__item">
          <button onClick={() => changeMonth('startStep', -6)}>+6 months</button>
          <button onClick={() => changeMonth('startStep', 6)}>-6 months</button>
        </div>
        <div className="top-control__item_left">
          <button onClick={() => dispatch({ type: 'scaleCoeff', payload: -1 })}>+scale</button>
          <button onClick={() => dispatch({ type: 'scaleCoeff', payload: 1 })}>-scale</button>
          {store.scaleCoeff}
        </div>
      </div>
      <div style={{ position: 'relative', height: store.height + 25 }}>{children}</div>
      <div className="bottom-control">
        <button onClick={() => changeMonth('finishStep', 6)}>+6 months</button>
        <button onClick={() => changeMonth('finishStep', -6)}>-6 months</button>
      </div>
    </div>
  );
};

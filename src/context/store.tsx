import { Callbacks } from '../common/interface';
import { createCallbacks } from '../layers/ConfigLayer';
import { createContext, useReducer } from 'react';
import { getHeight } from './reducer';
import Reducer from './reducer';
import React from 'react';
export interface Store {
  startStep: number;
  finishStep: number;
  scaleCoeff: number;
  width: number;
  height: number;
  style: any;
  callbacks: Callbacks;
  isAsc: boolean;
}

export const Context: any = createContext({});

const START_MONTH = -24;
const END_MONTH = 0;
const SCALE_COEFF = 1;

const StoreProvider = ({ children, ...props }) => {
  const initialContext: Store = {
    startStep: START_MONTH,
    finishStep: END_MONTH,
    scaleCoeff: SCALE_COEFF,
    width: 0,
    height: getHeight(START_MONTH, END_MONTH, SCALE_COEFF),
    callbacks: createCallbacks({}),
    isAsc: true,
    style: {
      primaryColor: '#ec407a',
      baseColor: '#424242FF',
      inverseBaseColor: '#E5E5E5FF',
    },
  };

  const [store, dispatch] = useReducer(Reducer, initialContext);

  return <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>;
};

export default StoreProvider;

// tslint:disable-next-line:cyclomatic-complexity
import { Store } from './store';
import { createVerticalMonths } from '../utils/common';
import StateReducer from '../utils/stateReducer';

export const getHeight = (start: number, finish: number, scaleCoeff: number) => {
  const verticalMonths = createVerticalMonths(start, finish, scaleCoeff);
  if (!verticalMonths.length) {
    return 0;
  }
  return verticalMonths[verticalMonths.length - 1].offset + verticalMonths[verticalMonths.length - 1].monthHeight;
};
const Reducer = (state: Store, action) => {
  switch (action.type) {
    case 'finishStep':
      const nextFinishStep = state.finishStep + action.payload;
      return { ...state, finishStep: nextFinishStep, height: getHeight(state.startStep, nextFinishStep, state.scaleCoeff) };
    case 'startStep':
      const nextStartStep = state.startStep + action.payload;
      return { ...state, startStep: nextStartStep, height: getHeight(nextStartStep, state.finishStep, state.scaleCoeff) };
    case 'bothSteps':
      return {
        ...state,
        startStep: action.payload.startStep,
        finishStep: action.payload.finishStep,
        height: getHeight(action.payload.startStep, action.payload.finishStep, state.scaleCoeff),
      };
    case 'scaleCoeff':
      //const oldCoeff = state.scaleCoeff;
      const scaleCoeff = action.payload > 0 ? state.scaleCoeff / 2 : state.scaleCoeff * 2;
      //const coeffChange = oldCoeff / scaleCoeff;
      //const startStep = Math.ceil(state.startStep * coeffChange);
      //const finishStep = Math.ceil(state.finishStep * coeffChange);
      return { ...state, scaleCoeff, height: getHeight(state.startStep, state.finishStep, scaleCoeff) };
    case 'style':
      return {
        ...state,
        style: action.payload,
      };
    case 'events':
      return {
        ...state,
        events: action.payload,
      };
    case 'width':
      return {
        ...state,
        width: action.payload,
      };
    case 'height':
      return {
        ...state,
        height: action.payload,
      };
    case 'callbacks':
      return {
        ...state,
        callbacks: action.payload,
      };
    case 'isAsc':
      return {
        ...state,
        isAsc: action.payload != null ? action.payload : !state.isAsc,
      };
    default:
      return state;
  }
};

export default Reducer;

import { EventButtonInitialState } from '../components/EventButton/utils/EventButton.utils';
const StateReducer = (state: EventButtonInitialState, action): EventButtonInitialState => {
  // Replace whole state
  if (!action.payload) {
    return { ...state, ...action };
  }

  const { stateName, type, data } = action.payload;

  switch (type) {
    default:
      return {
        ...state,
        [stateName]: data,
      };
  }
};

export default StateReducer;

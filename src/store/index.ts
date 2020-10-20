/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Reducer, Action as ReduxAction } from 'redux';
import { Layer } from 'modules/map';

export type State = {
  layers: Layer[];
}

export type Action = {
  type: string;
  payload?: any;
}

export type DispatchType = (param: Action) => Action;

const initialState: State = {
  layers: [],
};

export const ACTIONS = {
  SET_LAYER: 'set_layer',
  REMOVE_LAYER: 'remove_layer',
};

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_LAYER:
      return { ...state, layers: [...state.layers, action.payload] };
    case ACTIONS.REMOVE_LAYER: {
      const layers = state.layers.filter(({ id }) => id !== action.payload);
      return {
        ...state,
        layers,
      };
    }
    default:
      return state;
  }
}

import { REMOVE_ALERT, SEND_ALERT } from "../actions/types";

const initialState = [];

const alerts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alerts;

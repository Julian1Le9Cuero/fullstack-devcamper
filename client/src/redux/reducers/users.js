import { USER_ERROR } from "../actions/types";

const initialState = {
  error: null,
};

const users = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default users;

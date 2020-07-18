import { SEND_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const createAlert = (message, type, timeout = 4000) => async (
  dispatch
) => {
  const alert = {
    id: uuidv4(),
    type,
    message,
  };

  dispatch({
    type: SEND_ALERT,
    payload: alert,
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: alert.id,
    });
  }, timeout);
};

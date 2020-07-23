import axios from "axios";
import { USER_ERROR, LOAD_USER } from "./types";
import { createAlert } from "./alert";

// Update details (name and email)
export const updateUserDetails = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      "/api/v1/auth/me/updatedetails",
      formData,
      config
    );

    console.log(res.data);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
    dispatch(createAlert("Your credentials have been updated.", "success"));
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }
    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

// Update/Change password
export const updateUserPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      "/api/v1/auth/me/updatepassword",
      formData,
      config
    );

    console.log(res.data);
    dispatch(createAlert("Your password has been updated.", "success"));
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }

    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

// Forgot password/send email
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/v1/auth/forgotpassword",
      { email },
      config
    );

    console.log(res.data);
    dispatch(
      createAlert(
        "We have sent you an email, you have 10 minutes to update your password.",
        "success",
        5000
      )
    );
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }

    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

// Reset password with token provided from forgot password
export const resetPassword = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put("/api/v1/auth/resetpassword/:resettoken", formData, config);

    dispatch(createAlert("Password has been reset.", "success", 2000));

    setTimeout(() => {
      history.push("/bootcamps");
    }, 2000);
  } catch (error) {
    if (error.response.data.message) {
      const errors = error.response.data.message.split(",");
      errors.forEach((errorMessage) =>
        dispatch(createAlert(errorMessage, "danger"))
      );
    }

    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

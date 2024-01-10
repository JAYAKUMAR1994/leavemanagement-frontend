import axios from "axios";
import { createUser } from "../../store/userReducer";

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8081/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Use formik.values instead of dispatch
    });

    if (response.ok) {
      const data = await response.json();
      // Dispatch a success action if needed
      // dispatch(createUser({ type: 'SIGNUP_SUCCESS', payload: response.data }));
    } else {
      console.error("Error creating new book:", response.statusText);
    }
  } catch (error) {
    // Dispatch an error action if needed
    // dispatch(createUser({ type: 'SIGNUP_ERROR', payload: error.response.data }));
  }
};

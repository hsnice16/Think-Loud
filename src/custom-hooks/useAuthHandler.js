import axios from "axios";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookieHandler } from "custom-hooks";
import { setUserState } from "redux/features/user/userSlice";

import {
  ROUTE_HOME,
  checkAlphaNumericString,
  API_TO_POST_SIGN_IN_DETAILS,
  API_TO_POST_SIGN_UP_DETAILS,
} from "utils";

import {
  authReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  authInitialReducerState,
  ACTION_TYPE_ENTER_FORM_DETAILS,
} from "reducer";

/**
 * useAuthHandler - hook
 *
 * @returns state and handler functions
 *          related to authentication
 */
export const useAuthHandler = () => {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const { setCookies } = useCookieHandler();

  const [authState, dispatch] = useReducer(
    authReducer,
    authInitialReducerState
  );
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    rememberMe,
    status,
  } = authState;

  const handleInputChange = (event) => {
    if (status === "error") {
      dispatch({ type: ACTION_TYPE_SUCCESS });
    }

    if (event.target.name === "rememberMe") {
      dispatch({
        type: ACTION_TYPE_ENTER_FORM_DETAILS,
        payload: { [event.target.name]: event.target.checked },
      });
    } else {
      dispatch({
        type: ACTION_TYPE_ENTER_FORM_DETAILS,
        payload: { [event.target.name]: event.target.value },
      });
    }
  };

  const callAuthAPI = async (apiToCall, data) => {
    const { api, propertyToGet } = apiToCall;
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.post(api, {
        ...data,
      });

      const {
        encodedToken,
        [propertyToGet]: { username },
      } = response.data;

      const cookiesValue = {
        userUsername: username,
        userAuthToken: encodedToken,
      };

      userDispatch(
        setUserState({
          isUserAuthTokenExist: true,
          ...cookiesValue,
        })
      );

      setCookies(cookiesValue, rememberMe);
      dispatch({ type: ACTION_TYPE_SUCCESS });

      navigate(ROUTE_HOME, { replace: true });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ENTER_FORM_DETAILS,
        payload: { ...authInitialReducerState },
      });

      const { status, statusText } = error.response;

      if (status === 404 && statusText === "Not Found") {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: "Not Registered Email",
        });
      } else if (status === 401 && statusText === "Unauthorized") {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: "You have not entered correct either Email Id or Password",
        });
      } else if (status === 422 && statusText === "Unprocessable Entity") {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: "Email Already Exist",
        });
      } else {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error.message,
        });
      }
    }
  };

  const handleGuestLogInClick = (event) => {
    event.preventDefault();

    callAuthAPI(API_TO_POST_SIGN_IN_DETAILS, {
      email: "johnwick@gmail.com",
      password: "johnWick",
    });
  };

  const handleSignInFormSubmit = (event) => {
    event.preventDefault();

    if ([email, password].includes("")) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: "You have not entered either Email or Password",
      });
    } else {
      callAuthAPI(API_TO_POST_SIGN_IN_DETAILS, { email, password });
    }
  };

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();

    if ([firstName, lastName, email, password, confirmPassword].includes("")) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: "You have not entered all the fields. Please fill",
      });
    } else if (password !== confirmPassword) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: "Confirm Password must be same as Password",
      });
    } else if (!checkAlphaNumericString(password) || password.length < 6) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload:
          "Password should be Alpha Numeric and should have minimum length 6.",
      });
    } else {
      callAuthAPI(API_TO_POST_SIGN_UP_DETAILS, {
        email,
        password,
        lastName,
        firstName,
      });
    }
  };

  const authHandlers = {
    handleInputChange,
    handleGuestLogInClick,
    handleSignInFormSubmit,
    handleSignUpFormSubmit,
  };

  return { ...authState, ...authHandlers };
};

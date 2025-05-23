import { getToken, saveToken } from "../utils/authUtils";

// REGISTER ACTIONS
export const REGISTER_REQUEST = "auth/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (userData) => ({ type: REGISTER_SUCCESS, payload: userData });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const registerUser = (formData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/utenti/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrazione fallita");
    }

    dispatch(registerSuccess(data));
    return data;
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};

// NORMAL LOGIN ACTIONS
export const LOGIN_NORMAL_REQUEST = "auth/LOGIN_NORMAL_REQUEST";
export const LOGIN_NORMAL_SUCCESS = "auth/LOGIN_NORMAL_SUCCESS";
export const LOGIN_NORMAL_FAILURE = "auth/LOGIN_NORMAL_FAILURE";
export const LOGOUT_NORMAL = "auth/LOGOUT_NORMAL";

export const loginNormalRequest = () => ({ type: LOGIN_NORMAL_REQUEST });
export const loginNormalSuccess = (userData, token) => {
  const avatar = userData.avatar;
  return {
    type: LOGIN_NORMAL_SUCCESS,
    payload: { ...userData, avatar, token },
  };
};
export const loginNormalFailure = (error) => ({ type: LOGIN_NORMAL_FAILURE, payload: error });
export const logoutNormal = () => ({ type: LOGOUT_NORMAL });

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginNormalRequest());
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/utenti/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || "Login failed");
    }

    const data = await response.json();
    const token = data.token;
    saveToken(token);

    // Reindirizza alla pagina di successo specifica per login normale
    window.location.href = `/login-normal-success?token=${token}`;
  } catch (error) {
    dispatch(loginNormalFailure(error.message));
    alert(error.message);
  }
};

// GOOGLE LOGIN ACTIONS
export const LOGIN_GOOGLE_REQUEST = "auth/LOGIN_GOOGLE_REQUEST";
export const LOGIN_GOOGLE_SUCCESS = "auth/LOGIN_GOOGLE_SUCCESS";
export const LOGIN_GOOGLE_FAILURE = "auth/LOGIN_GOOGLE_FAILURE";
export const LOGOUT_GOOGLE = "auth/LOGOUT_GOOGLE";

export const loginGoogleRequest = () => ({ type: LOGIN_GOOGLE_REQUEST });
export const loginGoogleSuccess = (userData) => {
  const avatar = userData.avatar;
  return {
    type: LOGIN_GOOGLE_SUCCESS,
    payload: { ...userData, avatar },
  };
};
export const loginGoogleFailure = (error) => ({ type: LOGIN_GOOGLE_FAILURE, payload: error });
export const logoutGoogle = () => ({ type: LOGOUT_GOOGLE });

export const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google?prompt=consent`;
};

// FETCH PROFILE ACTIONS
export const FETCH_PROFILE_REQUEST = "auth/FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "auth/FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "auth/FETCH_PROFILE_FAILURE";

export const fetchProfile = () => async (dispatch, getState) => {
  const currentUser = getState().loginGoogle.user || getState().loginNormal.user;
  if (currentUser?.avatar) return;
  dispatch({ type: FETCH_PROFILE_REQUEST });

  const token = getToken();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/utenti/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Impossibile caricare il profilo");
    const user = await res.json();

    if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: user });
    }
  } catch (err) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err.message });
  }
};

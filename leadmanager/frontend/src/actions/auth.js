import axios from "axios";
import { returnErrors } from "./messages";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// CHECK TOKEN & LOAD USERS
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get("/api/auth/user", tokenConfig(getState))
        .then(rez => {
            dispatch({
                type: USER_LOADED,
                payload: rez.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        })
}

// LOGIN USER
export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, password })

    axios.post("/api/auth/login", body, config)
        .then(rez => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: rez.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: LOGIN_FAIL });
        })
}

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, email, password })

    axios.post("/api/auth/register", body, config)
        .then(rez => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: rez.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: REGISTER_FAIL });
        })
}

// LOGOUT USER 
export const logout = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.post("/api/auth/logout/", null, tokenConfig(getState))
        .then(rez => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}


// Setup config with token - helper function
export const tokenConfig = getState => {
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}

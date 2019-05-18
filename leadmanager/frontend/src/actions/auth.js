import axios from "axios";
import { returnErrors } from "./messages";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR
} from "./types";

// CHECK TOKEN & LOAD USERS
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'applicaton/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get("/api/auth/user", config)
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
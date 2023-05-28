import { API_URL } from "@/shared/config";
import { sessionModel } from "./model";

const { setLoading, setUser, resetUser, setError } = sessionModel.actions;
const BASE_URL = '/api/session';

const login = (credentials) => async (dispatch) => {
    dispatch(setLoading());

    try {
        const response = await fetch(`${API_URL}${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(setUser(data));
        } else {
            dispatch(setError(data.error));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

const signup = (credentials) => async (dispatch) => {
    dispatch(setLoading());

    try {
        const response = await fetch(`${API_URL}${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(setUser(data));
        } else {
            dispatch(setError(data.error));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

const logout = () => async (dispatch) => {
    dispatch(setLoading());

    try {
        const response = await fetch(`${API_URL}${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            dispatch(resetUser());
        } else {
            dispatch(setError({ error: 'Logout failed' }));
        }
    } catch (error) {
        dispatch(setError({ error: error.message }));
    }
};

export const sessionApi = {
    login,
    signup,
    logout,
};

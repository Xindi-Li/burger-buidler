import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

export const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		const url = isSignup
			? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEDrmCr0J7jnjXu7zTx9BMfzznyGCAqXA"
			: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEDrmCr0J7jnjXu7zTx9BMfzznyGCAqXA";

		axios
			.post(url, authData)
			.then(res => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", res.data.localId);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn * 1000));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFailed(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
				);
			}
		}
	};
};

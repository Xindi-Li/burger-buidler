import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
	yield localStorage.removeItem("token");
	yield localStorage.removeItem("expirationDate");
	yield localStorage.removeItem("userId");
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	const url = action.isSignup
		? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEDrmCr0J7jnjXu7zTx9BMfzznyGCAqXA"
		: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEDrmCr0J7jnjXu7zTx9BMfzznyGCAqXA";

	try {
		const res = yield axios.post(url, authData);
		const expirationDate = new Date(
			new Date().getTime() + res.data.expiresIn * 1000
		);
		localStorage.setItem("token", res.data.idToken);
		localStorage.setItem("expirationDate", expirationDate);
		localStorage.setItem("userId", res.data.localId);

		yield put(actions.authSuccess(res.data.idToken, res.data.localId));
		yield put(actions.checkAuthTimeout(res.data.expiresIn * 1000));
	} catch (error) {
		yield put(actions.authFailed(error));
	}
}

export function* authCheckStateSaga(action) {
	const token = localStorage.getItem("token");
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = new Date(localStorage.getItem("expirationDate"));
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = localStorage.getItem("userId");
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					expirationDate.getTime() - new Date().getTime()
				)
			);
		}
	}
}

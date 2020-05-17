import React, { useEffect, use, useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import styles from "./Auth.module.css";
import { Redirect } from "react-router-dom";

const Auth = props => {
	const [controls, setControls] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "email"
			},
			value: "",
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "password"
			},
			value: "",
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		}
	});
	const [isSignup, setIsSignup] = useState(false);

	const { building, authRedirectPath, onSetAuthRedirectPath } = props;
	useEffect(() => {
		if (!building && authRedirectPath !== "/") {
			onSetAuthRedirectPath();
		}
	}, [building, authRedirectPath, onSetAuthRedirectPath]);

	const checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	};

	const inputChangedHandler = (e, controlName) => {
		const updatedControls = {
			...controls,
			[controlName]: {
				...controls[controlName],
				value: e.target.value,
				valid: checkValidity(e.target.value, controls[controlName].validation),
				touched: true
			}
		};
		setControls(updatedControls);
	};

	const submitHandler = e => {
		e.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignup);
	};

	const switchAuthModeHander = () => {
		setIsSignup(prevState => !prevState);
	};

	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key]
		});
	}
	let form = formElementsArray.map(e => (
		<Input
			key={e.id}
			elementType={e.config.elementType}
			elementConfig={e.config.elementConfig}
			value={e.config.value}
			invalid={!e.config.valid}
			touched={e.config.touched}
			changed={event => inputChangedHandler(event, e.id)}
		/>
	));

	if (props.loading) {
		form = <Spinner />;
	}

	let error = null;

	if (props.error) {
		error = <p>{props.error.message}</p>;
	}

	let authRedirect = null;
	if (props.isAuth) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}
	return (
		<div className={styles.Auth}>
			{authRedirect}
			{error}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">SUBMIT</Button>
			</form>
			<Button clicked={switchAuthModeHander} btnType="Danger">
				SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token != null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

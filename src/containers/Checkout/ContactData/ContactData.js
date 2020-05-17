import React, { useState } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const ContactData = props => {
	const [orderForm, setorderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your Name"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "ZIP Code"
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Email"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "fastest", displayValue: "Fastest" },
					{ value: "cheapest", displayValue: "Cheapest" }
				]
			},
			validation: {},
			value: "fastest",
			valid: true
		}
	});

	const [formIsValid, setformIsValid] = useState(false);

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

	const orderHandler = e => {
		e.preventDefault();
		const formData = {};
		for (let formElementId in orderForm) {
			formData[formElementId] = orderForm[formElementId]["value"];
		}
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId
		};
		props.onOrderBurger(order, props.token);
	};

	const inputChangedHandler = (e, inputId) => {
		const updatedOrderForm = {
			...orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputId]
		};
		updatedFormElement["value"] = e.target.value;
		updatedFormElement["touched"] = true;
		updatedFormElement["valid"] = checkValidity(
			updatedFormElement["value"],
			updatedFormElement["validation"]
		);
		updatedOrderForm[inputId] = updatedFormElement;

		let formIsValid = true;
		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}
		setorderForm(updatedOrderForm);
		setformIsValid(formIsValid);
	};

	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key]
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(e => (
				<Input
					key={e.id}
					elementType={e.config.elementType}
					elementConfig={e.config.elementConfig}
					value={e.config.value}
					invalid={!e.config.valid}
					touched={e.config.touched}
					changed={event => inputChangedHandler(event, e.id)}
				/>
			))}
			<Button btnType="Success" disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={styles.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = distpatch => {
	return {
		onOrderBurger: (orderData, token) =>
			distpatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class ContactData extends Component {
	state = {
		orderForm: {
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
				valid: false
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
				valid: false
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
				valid: false
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
				valid: false
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
				valid: false
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
		},
		formIsValid: false
	};

	checkValidity = (value, rules) => {
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

	orderHandler = e => {
		e.preventDefault();
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId]["value"];
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(order);
	};

	inputChangedHandler = (e, inputId) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputId]
		};
		updatedFormElement["value"] = e.target.value;
		updatedFormElement["valid"] = this.checkValidity(
			updatedFormElement["value"],
			updatedFormElement["validation"]
		);
		updatedOrderForm[inputId] = updatedFormElement;

		let formIsValid = true;
		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const fromElementsArray = [];
		for (let key in this.state.orderForm) {
			fromElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{fromElementsArray.map(e => (
					<Input
						key={e.id}
						elementType={e.config.elementType}
						elementConfig={e.config.elementConfig}
						value={e.config.value}
						invalid={!e.config.valid}
						changed={event => this.inputChangedHandler(event, e.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};

const mapDispatchToProps = distpatch => {
	return {
		onOrderBurger: orderData => distpatch(actions.purchaseBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

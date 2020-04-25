import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = () => {
		const sum = Object.keys(this.props.ings)
			.map(key => this.props.ings[key])
			.reduce((sum, e) => sum + e, 0);
		return sum > 0;
	};

	updatePurchasingHandler = () => {
		if (this.props.isAuth) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.props.error ? (
			<p>Ingredients cannot be loaded</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabledInfo={disabledInfo}
						price={this.props.price}
						ordered={this.updatePurchasingHandler}
						purchasable={this.updatePurchaseState()}
						isAuth={this.props.isAuth}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price.toFixed(2)}
				/>
			);
		}

		return (
			<React.Fragment>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token != null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

import React, { useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

export const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);

	const dispatch = useDispatch();

	const ings = useSelector(state => state.burgerBuilder.ingredients);
	const price = useSelector(state => state.burgerBuilder.totalPrice);
	const error = useSelector(state => state.burgerBuilder.error);
	const isAuth = useSelector(state => state.auth.token != null);

	const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved = ingName =>
		dispatch(actions.removeIngredient(ingName));
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = path =>
		dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = () => {
		const sum = Object.keys(ings)
			.map(key => ings[key])
			.reduce((sum, e) => sum + e, 0);
		return sum > 0;
	};

	const updatePurchasingHandler = () => {
		if (isAuth) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		...ings
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let orderSummary = null;

	let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
	if (ings) {
		burger = (
			<React.Fragment>
				<Burger ingredients={ings} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabledInfo={disabledInfo}
					price={price}
					ordered={updatePurchasingHandler}
					purchasable={updatePurchaseState()}
					isAuth={isAuth}
				/>
			</React.Fragment>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ings}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				price={price.toFixed(2)}
			/>
		);
	}

	return (
		<React.Fragment>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token != null
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

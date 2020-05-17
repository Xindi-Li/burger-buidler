import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
	const { onFetchOrders, token, userId } = props;

	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map(order => (
			<Order
				ingredients={order.ingredients}
				price={+order.price}
				key={order.id}
			/>
		));
	}
	let authRedirect = null;
	if (!props.token) {
		authRedirect = <Redirect to="/" />;
	}
	return (
		<div>
			{authRedirect}
			{orders}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

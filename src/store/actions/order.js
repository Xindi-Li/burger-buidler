import * as actionsTypes from "./actionsTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionsTypes.PURCHASE_BURGER_SUCCUESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFailed = error => {
	return {
		type: actionsTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionsTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData, token) => {
	return {
		type: actionsTypes.PURCHASE_BURGER,
		orderData: orderData,
		token: token
	};
};

export const purchaseInit = () => {
	return {
		type: actionsTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionsTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFailed = error => {
	return {
		type: actionsTypes.FETCH_ORDERS_FAILED,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionsTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = (token, userId) => {
	return {
		type: actionsTypes.FETCH_ORDERS,
		token: token,
		userId: userId
	};
};

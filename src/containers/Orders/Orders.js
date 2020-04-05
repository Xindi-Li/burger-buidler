import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						ingredients={order.ingredients}
						price={+order.price}
						key={order.id}
					/>
				))}
			</div>
		);
	}
}

export default Orders;

import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Suspense, lazy } from "react";
import Spinner from "./components/UI/Spinner/Spinner";
import * as actions from "./store/actions/index";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Orders = lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route
							path="/checkout"
							render={() => (
								<Suspense fallback={<Spinner />}>
									<Checkout />
								</Suspense>
							)}
						/>
						<Route
							path="/orders"
							render={() => (
								<Suspense fallback={<Spinner />}>
									<Orders />
								</Suspense>
							)}
						/>
						<Route
							path="/auth"
							render={() => (
								<Suspense fallback={<Spinner />}>
									<Auth />
								</Suspense>
							)}
						/>
						<Route path="/logout" component={Logout} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => {
			dispatch(actions.authCheckState());
		}
	};
};

export default connect(null, mapDispatchToProps)(App);

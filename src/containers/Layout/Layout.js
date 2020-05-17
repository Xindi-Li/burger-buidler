import React, { useState } from "react";
import style from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
	const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setSideDrawerVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerVisible(prevState => !prevState);
	};

	return (
		<React.Fragment>
			<Toolbar
				drawerToggleClicked={sideDrawerToggleHandler}
				isAuth={props.isAuthenticated}
			/>
			<SideDrawer
				open={sideDrawerVisible}
				closed={sideDrawerClosedHandler}
				isAuth={props.isAuthenticated}
			/>
			<main className={style.Content}>{props.children}</main>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token != null
	};
};

export default connect(mapStateToProps)(Layout);

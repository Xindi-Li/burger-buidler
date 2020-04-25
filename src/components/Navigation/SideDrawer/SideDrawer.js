import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styles from "./SideDrawer.module.css";

const sideDrawer = props => {
	let attchedCLasses = [styles.SideDrawer, styles.Close];
	if (props.open) {
		attchedCLasses = [styles.SideDrawer, styles.Open];
	}

	return (
		<React.Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attchedCLasses.join(" ")} onClick={props.closed}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;

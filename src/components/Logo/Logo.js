import React from "react";
import BurgerLogo from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

const logo = props => (
	<div className={styles.Logo} style={{ height: props.height }}>
		<img src={BurgerLogo} alt="My Burger" />
	</div>
);

export default logo;

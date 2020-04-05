import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			const res = [];
			for (let i = 0; i < props.ingredients[igKey]; i++) {
				res.push(<BurgerIngredient key={igKey + i} type={igKey} />);
			}
			return res;
		})
		.reduce((arr, e) => {
			return arr.concat(e);
		}, []);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}
	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;

import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-my-burger-157de.firebaseio.com/"
});

export default instance;

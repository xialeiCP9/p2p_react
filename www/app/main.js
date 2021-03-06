import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import { BrowserRouter as Router , Route , Link } from "react-router-dom";
import reducer from "./reducers/index.js";
import App from "./components/App.js";

const middleware = [thunk];

if(process.env.MODE_ENV !== "production"){
	middleware.push(createLogger());
}
const store = createStore(reducer,applyMiddleware(...middleware));

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	,
	document.getElementById("container")
);
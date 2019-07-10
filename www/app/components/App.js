import React from "react";
import {Route,Link,NavLink} from "react-router-dom";
import {Switch} from "react-router";

import Home from "./HomePage/Home.js";
import Invest from "./InvestPage/Invest.js";
import "../css/style.less";

class App extends React.Component{
	constructor(){
		super();
		
	}
	componentDidMount(){
	}
	
	render(){
		return (
			<React.Fragment>
				<header>
					<div className="header-logo">
						<NavLink to="/">
							<img src="../../assets/images/header-logo.png" alt=""/>
						</NavLink>
					</div>
					<div className="nav-bar">
						<ul>
							<li>
								<NavLink exact to="/" activeClassName="selectedNav">首页</NavLink>
							</li>
							<li>
								<NavLink to="/invest" activeClassName="selectedNav">投资</NavLink>
							</li>
						</ul>
					</div>
				</header>
				<section className="container-body">
					<Switch>
						<Route exact path="/" component={Home}></Route>
						<Route path="/invest" component={Invest}></Route>
					</Switch>
				</section>
			</React.Fragment>
		)
	}
}

export default App;
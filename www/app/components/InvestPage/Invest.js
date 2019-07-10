import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import FilterBar from "./FilterBar.js";
import NowFilter from "./NowFilter.js";
import DataList from "./DataList.js";



import {fetchInitFilter,fetchData} from "../../actions/investActions.js";

class Invest extends React.Component{

	constructor({dispatch,filters,nowFilters}){
		super();
		dispatch(fetchInitFilter());
		dispatch(fetchData());
	}
	componentDidMount(){

	}
	//查看filterbar中的每条filter，是不是已经被选择，被选择，则不显示，否则显示
	checkFilterExist(){
		let filterExist = [];
		this.props.nowFilters.forEach((item) => {
			filterExist.push(item.title);
		});
		return filterExist;
	}
	render(){
		let filterExist = this.checkFilterExist();
		return (
			<React.Fragment>
				<div className="filter-wrap">
					<NowFilter nowFilters={this.props.nowFilters} dispatch={this.props.dispatch} />
					<FilterBar filters={this.props.filters} filterExist={filterExist} dispatch={this.props.dispatch} />
				</div>
				<DataList />
			</React.Fragment>
		)
	}
}

export default connect(
	(state) => {
		console.log(state.investReducer);
		return{
			filters: state.investReducer.filters,
			nowFilters: state.investReducer.nowFilters
		}
	}
)(Invest); 
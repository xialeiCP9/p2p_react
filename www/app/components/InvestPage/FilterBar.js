import React from "react";
import $ from "jquery";
import FilterItem from "./FilterItem.js";
import {addFilter} from "../../actions/investActions.js";

class FilterBar extends React.Component{
	constructor({filters,filterExist,dispatch}){
		super();
		this.ele = React.createRef();
	}
	componentDidMount(){
		
	}
	showFilter(){
		return this.props.filters.map((item,index) => {
			if(this.props.filterExist.includes(item.title)){
				return "";
			} else {
				return (
					<FilterItem filter={item} getpick={this.getpick.bind(this)} key={index} />
				)
			}
		})
	}
	//从子组件获取过滤的条件
	getpick(filters,title,type){
		console.log("我接收到了子组件的数据",title,filters);
		//将获取到的过滤器，传回总state
		this.props.dispatch(addFilter({title,filters,type}));
	}
	render(){
		return (
			<div className="filter-all" ref={this.ele}>
				{this.showFilter()}
			</div>
		)
		
	}
}

export default FilterBar;
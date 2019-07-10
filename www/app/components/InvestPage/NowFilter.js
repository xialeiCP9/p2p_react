import React from "react";

import {delFilter} from "../../actions/investActions.js";

class NowFilter extends React.Component{
	constructor({nowFilters,dispatch}){
		super();
		console.log(nowFilters)
	}
	del(title){
		this.props.dispatch(delFilter(title));
	}
	showFilterContent(item){
		switch(item.type){
			case "range":
				return (
					<span className="filter-content">{item.filters.join("~")}</span>
				)
				break;
			case "calendar":
				let begin = item.filters[0];
				let end = item.filters[1];
				return (
					<span className="filter-content">
					{
						begin.beginYear + "年" + begin.beginMonth + "月" + begin.beginDate + "日" + "~"
						+ end.endYear + "年" + end.endMonth + "月" + end.endDate + "日"
					}
					</span>
				)
				break;
			default:
				return (
					<span className="filter-content">{item.filters.join(" ")}</span>
				)
				break;
		}
	}
	render(){
		return (
			<div className="filter-selected">
				<div className="filter-first">
					<a href="javascript:;">全部结果</a>
				</div>
				<i className="filter-arrow">></i>
				<ul>
					{
						this.props.nowFilters.map((item,index) => {
							return (
								<li className="filter-box" key={index} onClick={this.del.bind(this,item.title)}>
									<span className="filter-type">{item.title}：</span>
									{this.showFilterContent(item)}
									<i className="close"></i>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
		
	}
}

export default NowFilter;
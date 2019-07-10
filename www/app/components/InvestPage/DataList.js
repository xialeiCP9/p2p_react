import React from "react";
import { connect } from "react-redux";

import DataRow from "./DataRow.js";
import Page from "../common/page/Page.js";

class DataList extends React.Component {
	constructor({data,totalCount,dispatch}){
		super();
		this.state = {
			columns: [
				{"englishName": "name","chineseName": "姓名","isShow": true},
				{"englishName": "school","chineseName": "学校","isShow": true},
				{"englishName": "education","chineseName": "学历","isShow": true},
				{"englishName": "type","chineseName": "类型","isShow": true},
				{"englishName": "min","chineseName": "最小金额","isShow": true},
				{"englishName": "max","chineseName": "最大金额","isShow": true},
				{"englishName": "need","chineseName": "仍需金额","isShow": true},
				{"englishName": "target","chineseName": "目标金额","isShow": true},
				{"englishName": "fundraising_deadline","chineseName": "截止时间","isShow": true},
				{"englishName": "earnings_time","chineseName": "还款时间","isShow": true},
			],
			isShowFilter: false,
			curPage: 1,
			numPerPage: 10
		}
	}
	showFilterColumn(){
		this.setState({
			isShowFilter: !this.state.isShowFilter
		})
	}
	doFilterColumn(name){
		let arr = [];
		this.state.columns.forEach((item) => {
			if(item.englishName == name){
				arr.push({
					...item,
					isShow: !item.isShow
				})
			} else {
				arr.push(item);
			}
		})
		this.setState({
			columns: arr
		})
	}
	onpick(pageNum){
		this.setState({
			curPage: pageNum
		})
	}
	showDataList(){
		return (
			<table className="list">
				<thead>
					<tr>
						{this.state.columns.map((item,index) => {
							if(item.isShow){
								return (
									<th key={index}>{item.chineseName}</th>
								)
							} 
						})}
					</tr>
				</thead>
				<tbody>
					{this.props.data.map((item,index) => {
						if(index < this.state.curPage * this.state.numPerPage && index >= (this.state.curPage - 1) * this.state.numPerPage)
							return <DataRow key={index} data={item} columns={this.state.columns} />
					})}
				</tbody>
			</table>
		)
	}
	render(){
		return (
			<section className="data-wrap">
				<div className="toolbar">
					<div className="columnFilter" title="筛选列">
						<i className="iconfont" onClick={this.showFilterColumn.bind(this)}>&#xe62a;</i>
						<ul className="columnList" style={{"display": this.state.isShowFilter ? "block" : "none"}}>
							{
								this.state.columns.map((item,index) => {
									return (
										<li key={index} 
											className={item.isShow ? "selected" : ""}
											onClick={this.doFilterColumn.bind(this,item.englishName)}
										>
											<i></i>
											{item.chineseName}
										</li>
								)
							})}
						</ul>
					</div>
				</div>
				{this.showDataList()}
				<Page totalCount={this.props.totalCount} 
				numPerPage={this.state.numPerPage} 
				curPage={this.state.curPage}
				onpick={this.onpick.bind(this)}
				 />
			</section>
		)
	}
}

export default connect(
	(state) => {
		return {
			data: state.investReducer.data,
			totalCount: state.investReducer.totalCount
		}
	}
)(DataList);
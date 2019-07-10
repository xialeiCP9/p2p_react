import React from "react";

import "../../../css/calendar.less";

class CalendarBox extends React.Component{
	constructor(){
		super();
		this.days = ["周日","周一","周二","周三","周四","周五","周六"];
		this.state = {
			dates: [
				[26,27,28,29,30,31, 1],
				[ 2, 3, 4, 5, 6, 7, 8],
				[ 9,10,11,12,13,14,15],
				[16,17,18,19,20,21,22],
				[23,24,25,26,27,28,29],
				[30, 1, 2, 3, 4, 5, 6]
			],
			months:[
				["1月","2月","3月"],
				["4月","5月","6月"],
				["7月","8月","9月"],
				["10月","11月","12月"],
			],
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			date: new Date().getDate(),
			mode: "date" //模式："日期"模式，显示为日期，月份模式，显示为月份，年份模式，显示为年份
		}

		console.log(this.getFirstDayOfMonth(2019,6));
		console.log(this.getDaysOfLastMonth(2019,1));
		console.log(this.getDateOfMonth(2019,6))
	}
	//得到这个月第一天是星期几
	getFirstDayOfMonth(year,month){
		return new Date(year,month - 1,1).getDay();
	}
	//得到上一个月的有多少天
	getDaysOfLastMonth(year,month){
		return new Date(new Date(year,month - 1,1).getTime() - 1).getDate();
	}
	//得到本月有多少天
	getDaysOfMonth(year,month){
		return new Date(year,month,0).getDate();
	}
	//获取本月最后一天是星期几
	getLastDayOfMonth(year,month){
		return new Date(year,month,0).getDay();
	}
	//获得表格中的日期数组
	getDateOfMonth(year,month){
		//辅助数组
		let allDateOfMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
									,20,21,22,23,24,25,26,27,28,29,30,31];
		let lastMonthDate = [22,23,24,25,26,27,28,29,30,31];

		let firstDayOfMonth = this.getFirstDayOfMonth(year,month);
		let daysOfLastMonth = this.getDaysOfLastMonth(year,month);
		let thisMonthDays = this.getDaysOfMonth(year,month);
		let _lastDayOfMonth = this.getLastDayOfMonth(year,month);
		let i = lastMonthDate.length - 1;
		while(lastMonthDate[i] != daysOfLastMonth){
			lastMonthDate.pop();
			i--;
		}
		console.log(firstDayOfMonth,daysOfLastMonth,lastMonthDate)
		let _lastMonthDate = lastMonthDate.slice(lastMonthDate.length - (firstDayOfMonth == 0 ? 7 : firstDayOfMonth));
		let _monthDate = allDateOfMonth.slice(0,thisMonthDays);
		let _nextMonthDate = allDateOfMonth.slice(0,42 - _lastMonthDate.length - _monthDate.length);
		let temp = _lastMonthDate.concat(_monthDate,_nextMonthDate);
		return [
			temp.slice(0,7),
			temp.slice(7,14),
			temp.slice(14,21),
			temp.slice(21,28),
			temp.slice(28,35),
			temp.slice(35)
		];
	}
	prevYear(){
		switch(this.state.mode){
			case "date":
				if(this.state.year <= 1900){
					return;
				}
				let year = this.state.year - 1;
				let dates = this.getDateOfMonth(year,this.state.month);
				this.setState({
					...this.state,
					year,
					dates,
					date: 1
				});
				break;
			case "month":
				if(this.state.year <= 1900){
					return;
				}
				this.setState({
					...this.state,
					year: this.state.year - 1,
					date: 1
				});
				break;
			default:
				break;
		}
	}
	nextYear(){
		if(this.state.year <= 1900){
			return;
		}
		let year = this.state.year + 1;
		let dates = this.getDateOfMonth(year,this.state.month);
		this.setState({
			...this.state,
			year,
			dates,
			date: 1
		})
	}
	prevMonth(){
		let year = this.state.year;
		let month = this.state.month;
		if(year <= 1900 && month <= 1){
			return;
		}
		if(month <= 1){
			month = 12;
			year = year - 1;
		} else {
			month = month - 1;
		}
		let dates = this.getDateOfMonth(year,month);
		this.setState({
			...this.state,
			year,
			month,
			date: 1,
			dates
		})
	}
	nextMonth(){
		let year = this.state.year;
		let month = this.state.month;
		if(month >= 12){
			month = 1;
			year = year + 1;
		} else {
			month = month + 1;
		}
		let dates = this.getDateOfMonth(year,month);
		this.setState({
			...this.state,
			year,
			month,
			date: 1,
			dates
		})
	}
	goToday(){
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth();
		let date = now.getDate();
		let dates = this.getDateOfMonth(year,month);
		this.setState({
			...this.state,
			year,
			month,
			date,
			dates
		})
	}
	switchMode(){
		switch(this.state.mode){
			case "date":
				this.setState({
					...this.state,
					mode: "month",
				})
		}
	}
	goMonth(m){
		let month = parseInt(m);
		let dates = this.getDateOfMonth(this.state.year,month);
		this.setState({
			...this.state,
			mode: "date",
			dates,
			month
		})
	}
	showTable(){
		switch(this.state.mode){
			case "date":
				return (
					<table>
						<thead>
							<tr>
								{
									this.days.map((item,index) => {
										return <th key={index}>{item}</th>
									})
								}
							</tr>
						</thead>
						<tbody>
							{
								this.state.dates.map((item,index) => {
									return (
										<tr key={index} itr={index}>
											{
												item.map((item,index) => {
													return (
														<td key={index}>{item}</td>
													)
												})
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
				);
				break;
			case "month":
				return (
					<table>
						<tbody>
							{
								this.state.months.map((item,index) => {
									return (
										<tr key={index} itr={index}>
											{
												item.map((item,index) => {
													return (
														<td key={index} onClick={this.goMonth.bind(this,item)}>{item}</td>
													)
												})
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
				)
		}
		
	}
	render(){

		return (
			<div className="calendarWrap">
				<div className="calendarbox">
					<div className="calendar-head">
						<a role="button" className="prev-year-btn" onClick={this.prevYear.bind(this)}></a>
						<a role="button" className="prev-month-btn" onClick={this.prevMonth.bind(this)} style={{"display":this.state.mode=="date"?"inline":"none"}}></a>
						<span onClick={this.switchMode.bind(this)}>{
							this.state.mode == "date" ? (this.state.year + "年" + this.state.month + "月") : (this.state.year + "年")
						}</span>
						<a role="button" className="next-month-btn" onClick={this.nextMonth.bind(this)}></a>
						<a role="button" className="next-year-btn" onClick={this.nextYear.bind(this)}></a>
					</div>
					<div className="calendar-body">
						{this.showTable()}
					</div>
					<div className="calendar-footer">
						<span className="today" onClick={this.goToday.bind(this)}>今天</span>
					</div>
				</div>
			</div>
		);
	}
}
export default CalendarBox;
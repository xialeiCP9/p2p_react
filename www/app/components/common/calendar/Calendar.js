import React from "react";
import DatePicker from "./DatePicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import $ from "jquery";
import "../../../css/calendar.less";

class Calendar extends React.Component{
	constructor({year,month,date}){
		super();
		this.calendarBody = React.createRef();
		
		this.isAmount = false;//此次动画结束,是否是在渲染新组件
		this.state = {
			year,
			month,
			date,
			mode: "date" //模式："日期"模式，显示为日期，月份模式，显示为月份，年份模式，显示为年份
		}
	}
	
	prevYear(){
		let now = new Date();
		switch(this.state.mode){
			case "date":
				var year = this.state.year - 1;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
				break;
			case "month":
				var year = this.state.year - 1;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
				break;
			case "year":
				var year = this.state.year - 12;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
			default:
				break;
		}
	}
	nextYear(){
		let now = new Date();
		switch(this.state.mode){
			case "date":
				var year = this.state.year + 1;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
				break;
			case "month":
				var year = this.state.year + 1;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
				break;
			case "year":
				var year = this.state.year + 12;
				this.setState({
					...this.state,
					year,
					date: this.state.month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
				});
			default:
				break;
		}
	}
	prevMonth(){
		let year = this.state.year;
		let month = this.state.month;
		let now = new Date();
		if(month == 1){
			year = year - 1;
			month = 12;
		} else {
			month = month - 1;
		}
		this.setState({
			...this.state,
			year,
			month,
			date: month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
		})
	}
	nextMonth(){
		let year = this.state.year;
		let month = this.state.month;
		let now = new Date();
		if(month == 12){
			year = year + 1;
			month = 1;
		} else {
			month = month + 1;
		}
		this.setState({
			...this.state,
			year,
			month,
			date: month == now.getMonth() + 1 && year == now.getFullYear() ? now.getDate() : 1
		})
	}
	//回到今天
	goToday(){
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		let date = now.getDate();
		this.setState({
			...this.state,
			year,
			month,
			date,
			mode: "date"
		})
	}
	//切换模式,给现在的组件添加动画
	switchMode(){
		
		switch(this.state.mode){
			case "date":
				$(this.calendarBody.current).addClass("down-out");
				this.setTime({mode: "month"});
				break;
			case "month":
				$(this.calendarBody.current).addClass("down-out");
				this.setTime({mode: "year"});
				break;
			default:
				break;
		}
	}
	//提供组件设置时间的函数
	setTime(time){
		let now = new Date();
		this.year = time.year ? time.year : this.state.year;
		this.month = time.month ? time.month: this.state.month;
		this.date = time.date ? time.date : 
				this.month == now.getMonth() + 1 && this.year == now.getFullYear() ? now.getDate() : 1;
		this.mode = time.mode ? time.mode : this.state.mode;
	}
	showTable(){
		switch(this.state.mode){
			case "date":
				return (
					<DatePicker year={this.state.year} month={this.state.month} 
					date={this.state.date} calendarBody={this.calendarBody} 
					setTime={this.setTime.bind(this)}
					setChooseTime={this.props.setChooseTime}
					earliest={this.props.earliest}
					latest={this.props.latest}
					/>
				);
				break;
			case "month":
				return (
					<MonthPicker year={this.state.year} month={this.state.month} 
					date={this.state.date} calendarBody={this.calendarBody}
					setTime={this.setTime.bind(this)} />
				);
			case "year":
				return (
					<YearPicker year={this.state.year} month={this.state.month} 
					date={this.state.date} calendarBody={this.calendarBody}
					setTime={this.setTime.bind(this)} />
				);
			default:
				return;
		}
	}
	showHead(){
		switch(this.state.mode){
			case "date":
				return (
					<span onClick={this.switchMode.bind(this)}>{
						this.state.year + "年" + this.state.month + "月"
					}</span>
				);
				break;
			case "month":
				return (
					<span onClick={this.switchMode.bind(this)}>{
						this.state.year + "年"
					}</span>
				);
			case "year":
				return (
					<span onClick={this.switchMode.bind(this)}>{
						(this.state.year - 1) + "年" + "-" + (this.state.year + 10) + "年"
					}</span>
				);
			default:
				return;
		}
	}
	animationEndHandle(){
		console.log("动画结束",this.state.mode);
		switch(this.state.mode){
			case "date":
				this.setState({
					...this.state,
					year: this.year,
					month: this.month,
					date: this.date,
					mode: this.mode
				});
				break;
			case "month":
				this.setState({
					...this.state,
					year: this.year,
					month: this.month,
					date: this.date,
					mode: this.mode
				});
				break;
			case "year":
				this.setState({
					...this.state,
					year: this.year,
					month: this.month,
					date: this.date,
					mode: this.mode
				});
				break;
		}
	}
	render(){

		return (
			<div className="calendarWrap">
				<div className="calendarbox">
					<div className="calendar-head">
						<a role="button" className="prev-year-btn" onClick={this.prevYear.bind(this)}></a>
						<a role="button" className="prev-month-btn" style={{"display":this.state.mode=="date"?"inline":"none"}} onClick={this.prevMonth.bind(this)}></a>
						{this.showHead()}
						<a role="button" className="next-month-btn" style={{"display":this.state.mode=="date"?"inline":"none"}} onClick={this.nextMonth.bind(this)}></a>
						<a role="button" className="next-year-btn" onClick={this.nextYear.bind(this)}></a>
					</div>
					<div className="calendar-body" ref={this.calendarBody}  onAnimationEnd={this.animationEndHandle.bind(this)}>
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
export default Calendar;
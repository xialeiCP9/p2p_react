import React from "react";
import $ from "jquery";
import "../../../css/calendar.less";
//import CalendarBox from "./CalendarBox.js";
import Calendar from "./Calendar.js";

class BECalendar extends React.Component{
	constructor({earliest,latest,onpick}){
		super();
		this.BECalendar = React.createRef();
		let now = new Date();
		this.state = {
			isShowSelectBox: false,
			beginYear: now.getFullYear(),
			beginMonth: now.getMonth() + 1,
			beginDate: now.getDate(),
			showBeginCalendar: false,
			endYear: now.getFullYear(),
			endMonth: now.getMonth() + 1,
			endDate: now.getDate(),
			showEndCalendar: false
		}
		this.earliest = earliest;
		this.latest = latest;
	}
	componentDidMount(){
		this.props.onpick({
			beginYear: this.state.beginYear,
			beginMonth: this.state.beginMonth,
			beginDate: this.state.beginDate
		},{
			endYear: this.state.endYear,
			endMonth: this.state.endMonth,
			endDate: this.state.endDate
		});
		//绑定事件,点击其他位置时,不显示日历
		let $calendar = $(this.BECalendar.current);
		$("html").on("click",(event) => {
			if($(event.target).closest($calendar).length == 0){
				this.setState({
					isShowSelectBox: false,
					showBeginCalendar: false,
					showEndCalendar: false
				})
			}
		})
	}
	componentWillUnmount(){
		$("html").off("click");
	}
	setBeginTime({year,month,date}){
		let begin = new Date(year,month,date);
		let endYear = this.state.endYear;
		let endMonth = this.state.endMonth;
		let endDate = this.state.endDate;
		let end = new Date(this.state.endYear,this.state.endMonth,this.state.endDate);
		if(begin.getTime() > end.getTime()){
			endYear = year;
			endMonth = month;
			endDate = date;
		}
		//发送起始日期给父组件
		this.props.onpick({
			beginYear: year,
			beginMonth: month,
			beginDate: date
		},{
			endYear,
			endMonth,
			endDate
		});
		this.setState({
			beginYear: year,
			beginMonth: month,
			beginDate: date,
			showBeginCalendar: false,
			endYear,
			endMonth,
			endDate
		})
	}
	setEndTime({year,month,date}){
		let end = new Date(year,month,date);
		let beginYear = this.state.beginYear;
		let beginMonth = this.state.beginMonth;
		let beginDate = this.state.beginDate;
		let begin = new Date(this.state.beginYear,this.state.beginMonth,this.state.beginDate);
		if(begin.getTime() > end.getTime()){
			beginYear = year;
			beginMonth = month;
			beginDate = date;
		}
		//发送起始日期给父组件
		this.props.onpick({
			beginYear,
			beginMonth,
			beginDate
		},{
			endYear: year,
			endMonth: month,
			endDate: date
		});
		this.setState({
			endYear: year,
			endMonth: month,
			endDate: date,
			showEndCalendar: false,
			beginYear,
			beginMonth,
			beginDate
		})
	}
	toggleBegin(){
		this.setState({
			showBeginCalendar: !this.state.showBeginCalendar,
			showEndCalendar: false
		})
	}
	toggleEnd(){
		this.setState({
			showBeginCalendar: false,
			showEndCalendar: !this.state.showEndCalendar
		})
	}
	showBegin(){
		if(this.state.showBeginCalendar){
			return (
				<Calendar year={this.state.beginYear} 
						  month={this.state.beginMonth} 
						  date={this.state.beginDate}
						  setChooseTime={this.setBeginTime.bind(this)} 
						  earliest={this.earliest}
						  latest={this.latest}
				/>
			)
		}
	}
	showEnd(){
		if(this.state.showEndCalendar){
			return (
				<Calendar year={this.state.endYear} 
						  month={this.state.endMonth} 
						  date={this.state.endDate}
						  setChooseTime={this.setEndTime.bind(this)}
						  earliest={this.earliest}
						  latest={this.latest}
				/>
			)
		}
	}
	showSelectBox(){
		if(this.state.isShowSelectBox){
			return (
				<div className="select-box">
					<div className="BECalendar-select">
						<label>
							<span>开始时间：</span>
							<div className="calendar">
								<span>{this.state.beginYear + "年" + this.state.beginMonth + "月" + this.state.beginDate + "日"}</span>
								<i className="iconfont" onClick={this.toggleBegin.bind(this)}>&#xe707;</i>
								{
									this.showBegin()
								}
							</div>
						</label>
						<label>
							<span>结束时间：</span>
							<div className="calendar">
								<span>{this.state.endYear + "年" + this.state.endMonth + "月" + this.state.endDate + "日"}</span>
								<i className="iconfont" onClick={this.toggleEnd.bind(this)}>&#xe707;</i>
								{
									this.showEnd()
								}
							</div>
						</label>
						<div className="totalTime">
							<span>{"共" + this.calcDuring() + "天"}</span>
						</div>
					</div>
				</div>
			)
		}
	}
	toggleSelectBox(){
		this.setState({
			isShowSelectBox: !this.state.isShowSelectBox,
			showBeginCalendar: false,
			showEndCalendar: false
		})
	}
	//计算日期间隔
	calcDuring(){
		let begin = new Date(this.state.beginYear,this.state.beginMonth,this.state.beginDate);
		let end = new Date(this.state.endYear,this.state.endMonth,this.state.endDate);
		return (end.getTime() - begin.getTime()) / 1000 / 3600 / 24 + 1;
	}
	render(){
		return (
			<div className="BECalendar" ref={this.BECalendar}>
				<span>
					{
						this.state.beginYear + "年" + this.state.beginMonth + "月" + this.state.beginDate + "日" +
						"-" + this.state.endYear + "年" + this.state.endMonth + "月" + this.state.endDate + "日"
					}
				</span>
				<i className="iconfont" onClick={this.toggleSelectBox.bind(this)}>&#xe707;</i>
				
				{this.showSelectBox()}
			</div>
		);
	}
}

export default BECalendar;
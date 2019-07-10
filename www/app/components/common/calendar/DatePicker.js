import React from "react";
import $ from "jquery";
import "../../../css/calendar.less";

class DatePicker extends React.Component{
	constructor({year,month,date,calendarBody,setTime,setChooseTime,earliest,latest}){
		super();
		this.days = ["周日","周一","周二","周三","周四","周五","周六"];
		this.container = React.createRef();
	}
	componentWillUnmount(){
		console.log("即将卸载Date组件",$(this.props.calendarBody.current));
		$(this.props.calendarBody.current).removeClass("down-out");
		this.props.setTime({
			mode: "month"
		})
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
	//设置日期
	setDate(date,isLastMonth,isNextMonth){
		let month = this.props.month;
		let year = this.props.year;
		if(isLastMonth){
			if(this.props.month <= 1){
				month = 12;
				year = year - 1;
			} else {
				month = month - 1;
			}
		}
		if(isNextMonth){
			if(this.props.month >= 12){
				month = 1;
				year = year + 1;
			} else {
				month = month + 1;
			}
		}
		
		
		//如果选择的时间不在时间范围之内,则不允许选择
		if(!this.checkTimeLegal(year,month,date)){
			return;
		}
		this.props.setChooseTime({
			year,
			month,
			date
		});
	}
	//查看当前时间是否在最早时间和最晚时间之间
	checkTimeLegal(year,month,date){
		let earliest = this.props.earliest;
		let latest = this.props.latest;
		if(this.props.earliest === undefined){
			earliest = {
				year: 1800,
				month: 1,
				date: 1
			}
		}
		if(this.props.latest === undefined){
			latest = {
				year: 2999,
				month: 12,
				date: 31
			}
		}
		let earliestY = earliest.year;
		let earliestM = earliest.month;
		let earliestD = earliest.date;
		let latestY = latest.year;
		let latestM = latest.month;
		let latestD = latest.date;

		let earliestTime = new Date(earliestY,earliestM,earliestD).getTime();
		let latestTime = new Date(latestY,latestM,latestD).getTime();
		let chooseTime = new Date(year,month,date).getTime();
		if(chooseTime < earliestTime || chooseTime > latestTime){
			return false;
		}
		return true;
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
		let _lastMonthDate = lastMonthDate.slice(lastMonthDate.length - (firstDayOfMonth == 0 ? 7 : firstDayOfMonth));
		let _monthDate = allDateOfMonth.slice(0,thisMonthDays);
		let _nextMonthDate = allDateOfMonth.slice(0,42 - _lastMonthDate.length - _monthDate.length);
		return {
			_lastMonthDate,
			_monthDate,
			_nextMonthDate
		};
	}
	showTable(){
		let {_lastMonthDate,_monthDate,_nextMonthDate} = this.getDateOfMonth(this.props.year,this.props.month);
		let lastMonthLength = _lastMonthDate.length;
		let nextMonthBegin = _lastMonthDate.length + _monthDate.length;
		let dates = [..._lastMonthDate,..._monthDate,..._nextMonthDate];
		let trs = [];
		let tds = [];
		dates.forEach((item,index) => {
			if(index % 7 == 0 && index != 0){
				trs.push(<tr key={index / 7}>{tds}</tr>);
				tds = [];
			}		
			tds.push(<td key={index} 
				className={[(this.props.date + lastMonthLength - 1 == index && this.checkTimeLegal(this.props.year,this.props.month,item)) ? "curDay" : "",
				(index < lastMonthLength || index >= nextMonthBegin || !this.checkTimeLegal(this.props.year,this.props.month,item))? "last-next-month-day" : "","date-item"].join(" ")}
				onClick={this.setDate.bind(this,item,index < lastMonthLength,index >= nextMonthBegin)}
				>{item}</td>
			);
		});
		trs.push(<tr key={6}>{tds}</tr>);
		return (
			<table className="date-table">
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
					{trs}
				</tbody>
			</table>
		)
	}
	render(){

		return (
			<React.Fragment>
				{this.showTable()}
			</React.Fragment>
		);
	}
}
export default DatePicker;
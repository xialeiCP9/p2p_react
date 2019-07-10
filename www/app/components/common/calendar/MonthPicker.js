import React from "react";
import $ from "jquery";
import "../../../css/calendar.less";

class MonthPicker extends React.Component{
	constructor({year,month,date}){
		super();
		this.month = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
	}

	monthHandle(m){
		$(this.props.calendarBody.current).addClass("down-out");
		this.props.setTime({
			month: m + 1,
			isAmount: true,
			mode: "date"
		})
	}
	componentWillUnmount(){
		console.log("即将卸载Month组件",$(this.props.calendarBody.current));
		$(this.props.calendarBody.current).removeClass("down-out");
		this.props.setTime({
			isAmount: false
		})
	}
	showTable(){
		let trs = [];
		let tds = [];
		this.month.forEach((m,index) => {
			if(index % 3 == 0 && index != 0){
				trs.push(<tr key={index / 3}>{tds}</tr>);
				tds = [];
			}
			tds.push(
				<td className="month-item"
					key={index}
					onClick={this.monthHandle.bind(this,index)}
				>
					<div className={["month-wrap",index == this.props.month - 1 ? "cur-month" : ""].join(" ")} >
						{m}
					</div>
				</td>
			)
		})
		trs.push(<tr key={this.month.length / 3}>{tds}</tr>);
		return (
			<table className="month-table">
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
export default MonthPicker;
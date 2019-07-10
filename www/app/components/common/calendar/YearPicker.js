import React from "react";
import $ from "jquery";
import "../../../css/calendar.less";
class YearPicker extends React.Component{
	constructor({year,month,date}){
		super();
	}

	yearHandle(y){
		$(this.props.calendarBody.current).addClass("down-out");
		this.props.setTime({
			year: this.years[y],
			mode: "date"
		})
	}
	componentWillUnmount(){
		console.log("即将卸载Year组件",$(this.props.calendarBody.current));
		$(this.props.calendarBody.current).removeClass("down-out");
	}
	showTable(){
		let trs = [];
		let tds = [];
		let {year} = this.props;
		this.years = [year - 1,year,year + 1,year + 2,year + 3,year + 4,year + 5,year + 6,year + 7,year + 8,year + 9,year + 10];
		this.years.forEach((m,index) => {
			if(index % 3 == 0 && index != 0){
				trs.push(<tr key={index / 3}>{tds}</tr>);
				tds = [];
			}
			tds.push(
				<td className="month-item"
					key={index}
					onClick={this.yearHandle.bind(this,index)}
				>
					<div className={["month-wrap",index == 1 ? "cur-month" : ""].join(" ")} >
						{m}
					</div>
				</td>
			)
		})
		trs.push(<tr key={this.years.length / 3}>{tds}</tr>);
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
export default YearPicker;
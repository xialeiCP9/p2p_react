import React from "react";

class DataRow extends React.Component{
	constructor({data,columns}){
		super();
	}
	show(){
		let tds = [];
		this.props.columns.forEach((item,index) => {
			if(item.isShow){
				tds.push(<td key={index}>{this.props.data[item.englishName]}</td>)
			}
		});

		return tds;
	}
	render(){
		return (
			<tr>
				{this.show()}
			</tr>
		)
	}
}
export default DataRow;